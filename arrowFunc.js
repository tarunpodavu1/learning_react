//Regular functions do not block "this" 

const tahoe = {
    mountains: ['freel', 'rose', 'tallac', 'rubicon', 'silver'],
    print: function(delay=1000){
        setTimeout(function(){
            console.log(this.mountains.join(", "));
        }, delay);
    }
};

// tahoe.print(); // TypeError: Cannot read properties of undefined (reading 'join')

//To solve the above problem, we can use the arrow function syntax to protect the scope of "this"

const tahoe2 = {
    mountains: ['freel', 'rose', 'tallac', 'rubicon', 'silver'],
    print: function(delay=1000){
        setTimeout(() => {
            console.log(this.mountains.join(", "));
        }, delay);
    }
};

tahoe2.print();