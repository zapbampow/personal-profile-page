function aboutMe () {
    let i = 0;

    function words (){ 
        const arr = ['a husband', 'a dad', 'a baker', 'a boardgame enthusiast', 'a homebrewer', 'a backyard chicken raiser', 'a sci-fi novel fan', 'a priest', 'a weirdo', 'a 9 on the Enneagram', 'an INTJ'];

        let word = arr[i];

        document.getElementById('about-me').textContent = word;

        if(i<arr.length-1){
            i ++;
        } else {
            i = 0;
        }

    }

    setInterval(words, 1000);      
}

aboutMe();