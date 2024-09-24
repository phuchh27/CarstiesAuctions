using System;
using BiddingService.Models;
using MongoDB.Entities;

namespace BiddingService;

public class Bid : Entity
{
    public string AuctionId { get; set; }
    public string Bidder { get; set; }
    public DateTime BidTIime { get; set; } = DateTime.UtcNow;
    public int Amount { get; set; }
    public BidStatus BidStatus { get; set; }
}
