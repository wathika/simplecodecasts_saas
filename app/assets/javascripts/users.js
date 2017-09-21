$(document).ready(function() {
  Stripe.setPublishableKey($('meta[name="stripe_key"]').attr('content'));


  //Watch for a form submission
  $("pro_form_submit_btn").click(function(event){
    event.preventDefault();
    $('input[type=submit]').prop('disabled', true);
    var error = false;
    var ccNum = $('#card_number').val(),
        cvvNum = $('#card_code').val(),
        expMonth = $('#card_month'),
        expYear = $('#card_year');

    if (!error) {
      //Get the Stripe token
      Stripe.createToken({
        number: ccNum,
        cvv: cvvNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeRespondHandler);
    }
    return false;

  }); //form submission

function stripeRespondHandler(status, response){
  //Get a referenceto the form
  var f = $("#new_user");

  //Get a token from the response
  var token = response.id;

  //Add the token to the form
  f.append("<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />");

  //Submit the form
  f.get(0).submit();
}

})
