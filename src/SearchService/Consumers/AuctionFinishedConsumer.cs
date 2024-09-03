using System;
using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace SearchService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        var aucion = await DB.Find<Item>().OneAsync(context.Message.AuctionId);

        if (context.Message.ItemSold)
        {
            aucion.Winner = context.Message.Winner;
            aucion.SoldAmount = (int)context.Message.Amount;
        }

        aucion.Status="Finished";

        await aucion.SaveAsync();
    }
}
