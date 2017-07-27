
angApp.controller("black_jack_CTRL",function ($scope,deck_setup,hand_setup) {




	/* win/lose ratio */
    var wins = 0;
    var losses = 0;
    var deck = deck_setup;
    var hand = hand_setup;

    var angulardeck = deck.createNew();
    console.log('inintal new Deck');
    console.log(angulardeck);

    /** Tally the score to determine the outcome. */
    var declareWinner = function (userHand, dealerHand){
        var outcome = '',
            dealerScore = dealerHand.score(),
            userScore = userHand.score();
 
        /* I didn't make the rules, I just enforce them. */
        if (userScore > 21 || dealerScore === 21){
            outcome = "You lose!";
            losses++;
        }else if (userScore <= 21 && userHand.getHand().length >=5){
            outcome = "You win! 5-card Lucky!";
            wins++;
        }else if (dealerScore > 21 || userScore === 21 || userScore > dealerHand.score()){
            outcome = "You win!";
            wins++;
        }else if (dealerScore > userScore){
            outcome = "You lose!";
            losses++;
        }else if (dealerScore === userScore){
            outcome = "You tied draw!";
        }
        /* Output the result of the round. */
        return outcome+"<br />Dealer: "+dealerHand.score()+"<br />You: "+userScore;
    };

     var dealerHand = function (){
        var angularHand = hand.createNew(angulardeck);

        while (angularHand.score() < 17){
            angularHand.hitMe();
        }
        return angularHand;
    };


    /** Holds your Hand */
    var angularHand;

    /* CACHE SELECTORS!!! */
    var $hitButton = $("#hitMe"),
        $standButton = $("#stand"),
        $dealButton = $("#deal"),
        $score = $("#yourScore"),
        $yourHand = $('#yourHand'),
        $dealerHand = $('#dealerHand');

    /** Show the Deal button, hide others. */
    var showDeal = function (){
        $hitButton.hide();
        $standButton.hide();
        $dealButton.show();
    };

     /** Show the control buttons, hide Deal. */
    var showControls = function (){

        $hitButton.show();
        $standButton.show();
        $score.show();
        $dealButton.hide();

    };

    /** Update your score and card display. */
    var updateUI = function (){
        /* Cards */
       	$("#yourHand").html(angularHand.toHtml());
        /* Score */
        $('#yourScore').find(".digits").html(angularHand.score());
        $("#wins").text(wins);
        $("#losses").text(losses);
    };


  

   /* Deal Button */
    $scope.deal = function(){
    	angularHand = hand.createNew(angulardeck);
    	updateUI();
    	showControls();

    };

    /* Hit Button */
    $hitButton.on('click', function (){
        angularHand.hitMe();
        if (angularHand.getHand().length >= 5 || angularHand.score() > 21){
            $standButton.trigger('click');
        }else{
            updateUI();
        }
    });

    /* Stand Button */
    $standButton.on('click', function (){
        $yourHand.html(declareWinner(angularHand, dealerHand()));
        showDeal();
    });

    /* shuffle. */
    angulardeck.shuffle();


})