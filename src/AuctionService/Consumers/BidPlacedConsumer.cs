using System;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    private readonly AuctionDbContext _dbContext;

    public BidPlacedConsumer(AuctionDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine("--> Consuming bid placed");
        var aucion = await _dbContext.Auctions.FindAsync(Guid.Parse(context.Message.AuctionId));

        if (
            aucion.CurrentHighBid == null
            || context.Message.BidStatus.Contains("Accepted")
                && context.Message.Amount > aucion.CurrentHighBid
        )
        {
            aucion.CurrentHighBid = context.Message.Amount;
            await _dbContext.SaveChangesAsync();
        }
    }
}
