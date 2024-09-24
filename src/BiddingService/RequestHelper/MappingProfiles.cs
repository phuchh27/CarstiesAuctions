using System;
using AutoMapper;
using BiddingService.DTOs;
using Contracts;

namespace BiddingService.RequestHelper;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Bid, BidDto>();
        CreateMap<Bid, BidPlaced>();
    }
}
