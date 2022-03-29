using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReversiMvcApp.Areas.Identity
{
    public static class IdentityDataInitializer
    {
        public static void SeedData(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            SeedRoles(roleManager);
            SeedUsers(userManager);
        }

        public static void SeedUsers (UserManager<IdentityUser> userManager)
        {
            if (userManager.FindByEmailAsync("beheerder@tasker.nl").Result == null)
            {
                //var user = new IdentityUser { UserName = Input.Email, Email = Input.Email, EmailConfirmed = true };
                //var result = await userManager.CreateAsync(user, Input.Password);

                IdentityUser user = new IdentityUser();
                user.UserName = "beheerder@tasker.nl";
                user.Email = "beheerder@tasker.nl";
                user.EmailConfirmed = true;

                string password = "Nimda21!";

                IdentityResult result = userManager.CreateAsync(user, password).Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Beheerder").Wait();
                }
            }
        }

        public static void SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("Speler").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Speler";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }

            if (!roleManager.RoleExistsAsync("Mediator").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Mediator";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }

            if (!roleManager.RoleExistsAsync("Beheerder").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Beheerder";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }
        }
    }
}
