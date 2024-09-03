using System;
using AuctionService.Entities;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionFinishedComsumer : IConsumer<AuctionFinished>
{
    private readonly AuctionDbContext _dbContext;
    public AuctionFinishedComsumer(AuctionDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        Console.WriteLine("--> Consuming bid finished");
        
        var aucion = await _dbContext.Auctions.FindAsync(context.Message.AuctionId);

        if (context.Message.ItemSold)
        {
            aucion.Winner = context.Message.Winner;
            aucion.SoldAmount = context.Message.Amount;

        }

        aucion.Status = aucion.SoldAmount > aucion.ReservePrice
            ? Status.Finished
            : Status.ReserveNotMet;

        await _dbContext.SaveChangesAsync();
    }

}
