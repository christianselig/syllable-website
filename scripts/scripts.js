jQuery(document).ready(function($) {

	// Click on my picture to jump to the contact me section
	$('.me-header').click(function() {
		$('#name').focus();
	});

	// Hover effect for my picture
	$('.me-header').hover(
		function() {
			$('.me-header .top-image').animate({opacity:0}, 300);
		},
		function() {
			$('.me-header .top-image').animate({opacity:1}, 300);
		}
	);

	// Hover effect for resume picture
	$('.resume-header').hover(
		function() {
			$('.resume-header .top-image').animate({opacity:0}, 300);
		},
		function() {
			$('.resume-header .top-image').animate({opacity:1}, 300);
			// $('.resume-header .bottom-image').css('visibility', 'hidden');
		}
	);

	// If name field is left blank and they leave the field
	$('#name').blur(function() {
		if ($.trim($('#name').val()) == "") {
			$(".name-error").show();
			$(".name-error").text("You forgot your name!");

		}
		else {
			$(".name-error").hide();
		}
	});

	// If email field is left empty or is invalid and they leave the field
	$("#email").blur(function() {
		var emailRegEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if ($.trim($("#email").val()) == "" || !emailRegEx.test($("#email").val())) {
			if ($("#email").val() == "") {
				$(".email-error").show();
				$(".email-error").text("I need to be able to contact you back!");

			}
			else if (!emailRegEx.test($("#email").val())) {
				$(".email-error").show();
				$(".email-error").text("Sorry, that's an invalid email address.");
			}
		}
		else {
			$(".email-error").hide();
		}
	});

	// If message field is left blank and they leave the field
	$("#message").blur(function() {
		if ($.trim($("#message").val()) == "") {
			$(".message-error").show();
			$(".message-error").text("Seems like you're being a little quiet...");
		}
		else {
			$(".message-error").hide();
		}
	});

	// Handles when a name error is displayed and they correct it
	$("#name").keyup(function() {
		if ($.trim($("#name").val()) != "") {
			$(".name-error").hide();
		}
	});

	// Handles when an email error is displayed and they correct it
	$("#email").keyup(function() {
		if($.trim($("#email").val()) != "" && /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test($("#email").val())) {
			$(".email-error").hide();
		}
	});

	// Handles when a message error is displayed and they correct it
	$("#message").keyup(function() {
		if ($.trim($("#message").val()) != "") {
			$(".message-error").hide();
		}
	});

	// Handling errors when user clicks submit
	$(".submit").click(function(event) {
		var nameVal = $.trim($("#name").val());
		var emailVal = $.trim($("#email").val());
		var messageVal = $.trim($("#message").val());
		var emailRegEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

		if (nameVal == "" || emailVal == "" || messageVal == "" || !emailRegEx.test(emailVal) || nameVal.length > 100 || emailVal.length > 100 || messageVal.length > 15000) {
			event.preventDefault();
			$(this).effect("shake", { times:2 }, 90);

			if (messageVal == "") {
				$(".message-error").show();
				$(".message-error").text("Seems like you're being a little quiet...");
				$("#message").focus();
			}

			if (emailVal == "") {
				$(".email-error").show();
				$(".email-error").text("I need to be able to contact you back!");
				$("#email").focus();
			}
			else if (!emailRegEx.test(emailVal)) {
				$(".email-error").show();
				$(".email-error").text("Sorry, that's an invalid email address.");

				$("#email").focus();
			}

			if (nameVal == "") {
				$(".name-error").show();
				$(".name-error").text("You forgot your name!");
				$("#name").focus();
			}

			if (nameVal.length > 100 || emailVal.length > 100 || messageVal.length > 15000) {
				alert("One of your fields is too long, please correct this. Maximum of 100 for name and email, and 10,000 for the message.");
			}
		}
		else {
			// Following section submits form without refreshing page
			var dataString = "name=" + nameVal + "&email=" + emailVal + "&message=" + messageVal;

			$.ajax({
				type: "POST",
				url: "../mail.php",
				data: dataString,
				success: function(data) {
					$(".contact-form").hide();
					$(".alt-contact").hide();

					// Depending on what the PHP script returned, display a message of success or error
					if (data == 1) {
						$(".contact-form").html("<div class='success-message'><div class='success-image'></div><div class='success-title'>Success! The message has been sent!</div><div class='success-body'>I'll get back to you right away.</div></div>");
					}
					else {
						$(".contact-form").html("<div class='error-message'><div class='error-image'></div><div class='error-title'>Whoops! An error occurred.</div><div class='error-body'>That's strange... Please <a href='mailto:support@syllableapp.com'>email me</a> instead and mention the error. Sorry about that.</div></div>");
					}

					$(".contact-form").fadeIn(500);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					$(".contact-form").hide();
					$(".alt-contact").hide();

					// Inserts divs making up the success message for the form submission
					$(".contact-form").html("<div class='error-message'><div class='error-image'></div><div class='error-title'>Whoops! An error occurred.</div><div class='error-body'>That's strange... Please <a href='mailto:support@syllableapp.com'>email me</a> instead. Sorry about that.</div></div>");

					$(".contact-form").fadeIn(500);
				}
			});

			return false;
		}
	});
});
