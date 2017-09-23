$(document).ready(function(){
  Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));


  //Watch for form submissions
  $("#pro_form_submit_btn").click(function(event){
    event.preventDefault();
    $('input[type=submit]').prop('disabled', true);
     var error = false;
     var ccNum = $('#card_number').val(),
         cvcNum = $('#card_code').val(),
         expMonth = $('#card_month').val(),
         expYear = $('#card_year').val();

    if(!error) {
      //Get Stripe token
      Stripe.card.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    return false;
  }); //form submission


  function stripeResponseHandler(status, response) {

  // Grab the form:
  var $form = $('#new_user');

  if (response.error) { // Problem!

    // Show the errors on the form
    $form.find('.payment-errors').text(response.error.message);
    $form.find('button').prop('disabled', false); // Re-enable submission

  } else { // Token was created!

    // Get the token ID:
    var token = response.id;

    // Insert the token into the form so it gets submitted to the server:
    $form.append($('<input type="hidden" name="user[stripe_card_token]" />').val(token));

    // Submit the form:
    $form.get(0).submit();

  }
}
})
