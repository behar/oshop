using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace oshop.Persistence.Resources
{
    public class UserResource
    {
                public UserResource()
        {
            UserAddress = new Collection<UserAddResource>();
        }
        
        public int Id { get; set; }
        public string UserName { get; set; }

        public ICollection<UserAddResource> UserAddress { get; set; }
    }
}