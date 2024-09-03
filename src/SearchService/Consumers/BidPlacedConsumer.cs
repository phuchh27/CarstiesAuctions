using System;
using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace SearchService.Consumers;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine("--> Consuming bid placed");

        var aucion = await DB.Find<Item>().OneAsync(context.Message.AuctionId);

        if (context.Message.BidStatus.Contains("Accepted")
        && context.Message.Amount > aucion.CurrentHighBid)
        {
            aucion.CurrentHighBid = context.Message.Amount;
            await aucion.SaveAsync();
        }
    }
}
