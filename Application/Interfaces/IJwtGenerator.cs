using System.Security.Claims;
using System.Collections.Generic;
using Domain;

namespace Application.Interfaces
{
    public interface IJwtGenerator
    {
        string CreateToken(AppUser user);
    }
}