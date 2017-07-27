angApp.factory('deck_setup', function(card_setup) {
    function Deck() { 

        var cards = [];
        card = card_setup;
    var newCards = function (){
        var i,
            suit,
            number;
            //range 52
        for (i=0;i<52;i++){
            suit = i%4+1;
            number = i%13+1;
            //this creates all cards wiht numbbers and suit;
            //cards.push(new Card(suit,number));

             //build your service here important test;
            var rs = card.createNew(suit,number);
            cards.push(rs);


            console.log("cards.push(new Card(suit,number));");
            console.log(cards);
        }
    };
    /* Create those new cards. */
    newCards();

    this.shuffle = function (){
        for(var j, x, i = cards.length; i; j = parseInt(Math.random() * i), x = cards[--i], cards[i] = cards[j], cards[j] = x);
        return this.getCards();
    };
    /** @returns {Array} An array of cards representing the Deck. */
    this.getCards = function (){
        return cards;
    };
    /** @returns {Card} Deals the top card off the deck. Removes it from the Deck. */
    this.deal = function (){
        if (!cards.length){
            console.log("Ran out of cards, new deck");
            newCards();
            this.shuffle();
        }
        return cards.pop();
    };


    }
    return {
        createNew: function() {
            return new Deck();
        }
    };
});
