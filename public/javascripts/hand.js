angApp.factory('hand_setup', function() {
    function Hand(deck) { 

        var cards = [];
        //deck = deck_setup;

        console.log("deck in hand initial");
        console.log(deck);

        /* Deal two cards to begin. */
        cards.push( deck.deal(), deck.deal());
        /** @returns {Array} The array of Cards representing the Hand. */
        this.getHand = function (){
            return cards;
        };
        /** @returns {Number} The score of the Hand. */
        this.score = function (){

            var i,
            score = 0,
            cardVal = 0, 
            aces = 0; 
                
            for (i=0;i<cards.length;i++){
                cardVal = cards[i].getValue();
                if (cardVal == 11) {
                    aces += 1;
                }
                score += cardVal;
            }
            /* Check to see if Aces should be 1 or 11 */
            while (score > 21 && aces > 0){
                score -= 10;
                aces -=1;
            }
            return score;
        };
        /** @returns {String} Comma separated list of Card names in the Hand. */
        this.printHand = function (){
            var arrayOut = [],
                i;

            for (i=0;i<cards.length;i++){
                arrayOut.push(cards[i].getName());
            }
            return arrayOut.join();
        };
        /** Adds a Card from the Deck into the Hand. */
        this.hitMe = function (){
            if (cards.length < 5){
                cards.push(deck.deal());
            }
        };
        /** @returns {String} HTML representation of the Cards in the Hand. */
        this.toHtml = function (){
            var arrayOut = [],
                i;

            for (i=0;i<cards.length;i++){
                //output card
                arrayOut.push('<div class="card ',cards[i].getSuit(),' ',cards[i].getNumber(),'">',cards[i].getName(),'</div>');
            }
            return arrayOut.join('');
        };

    }

    return {
        createNew: function(deck) {
            return new Hand(deck);
        }
    };
});


