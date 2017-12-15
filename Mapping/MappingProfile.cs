using AutoMapper;
using oshop.Models;
using oshop.Persistence.Resources;

namespace oshop.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<User,UserResource>();

            CreateMap<UserAddress,UserAddResource>();
        }
    }
}