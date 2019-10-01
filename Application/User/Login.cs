using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly SignInManager<AppUser> signInManager;

            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
            {
                this.userManager = userManager;
                this.signInManager = signInManager;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                //handler logic goes here
                var user = await this.userManager.FindByEmailAsync(request.Email);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized);
                }

                var results = await this.signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                if (results.Succeeded)
                {
                    //TODO GENERATE TOKEN
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Token = "This Will Be A Token",
                        Username = user.UserName,
                        Image = null
                    };
                }

                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}