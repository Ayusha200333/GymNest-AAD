$(document).ready(function () {
    $(".toggle-password").click(function () {
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $(this).prev();
        if (input.attr("type") === "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        $.ajax({
            url: "http://localhost:8080/api/v1/auth/authenticate",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                email: $("#email").val(),
                password: $("#password").val(),
            }),
            success: function (response) {
                // Store the token
                localStorage.setItem("jwt_token", response.data.token);

                // Add debugging to see what's in the response
                console.log("Authentication response:", response);
                console.log("User role:", response.data.role);

                // Reset the form
                $("#loginForm")[0].reset();

                // Redirect based on role
                const role = response.data.role.toUpperCase(); // Convert to uppercase

                console.log("User role after conversion:", role);

                if (role === "ADMIN") {
                    console.log("Redirecting to admin dashboard");
                    window.location.href = "AdminDashboard.html";
                } else if (role === "USER") {
                    console.log("Redirecting to customer dashboard");
                    window.location.href = "CustomerDashboard.html";
                } else {
                    console.log("Role not recognized, redirecting to index");
                    window.location.href = "index.html";
                }

            },
            error: function (xhr, status, error) {
                console.error("Login error details:", xhr.responseText);
                alert("Login failed. Please check your credentials.");
            },
        });
    });

    $("#registerForm").on("submit", function (e) {
        e.preventDefault();

        const password = $("#password").val();
        const confirmPassword = $("#confirmPassword").val();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        $.ajax({
            url: "http://localhost:8080/api/v1/user/register",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                email: $("#email").val(),
                password: password,
                name: $("#name").val(),
                role: $("#role").val(),
            }),
            success: function (response) {
                alert("Registration successful! Please login.");
                $("#registerForm")[0].reset();
                window.location.href = "../register.html";
            },
            error: function (xhr, status, error) {
                alert("Registration failed. Please try again.");
                console.error("Error:", error);
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    alert(xhr.responseJSON.message);
                }
            },
        });
    });
});