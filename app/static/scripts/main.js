playing = true
counter = 0
play_again_button = "<a href='/'><button class='play'>Play again</button></a>"

$(document).ready(function(){

    const socket = io();

    // win or lose
    socket.on('win_show', (data)=>{
        playing = false
        var answer = document.getElementById('answer')
        answer.style.display = "none"
        var samples_display = document.getElementById('show_samples')
        samples_display.style.display = "none"

        var win = document.getElementById('win')
        win.innerHTML = "<h4>"+data['msg']+"</h4>"+play_again_button
        win.style.display = "flex"
        
    })

    socket.on('lose_show', (data)=>{
        playing = false
        var answer = document.getElementById('answer')
        answer.style.display = "none"
        var samples_display = document.getElementById('show_samples')
        samples_display.style.display = "none"

        var lose = document.getElementById('lose')
        lose.innerHTML = "<h4>"+data['msg']+"</h4>"+play_again_button
        lose.style.display = "flex"  
    })

    $('.begin').click(function(){
        if (playing) socket.emit('start',{})
    })

    $(document).keyup(function(event) {
        if ($(".answer_text").is(":focus") && event.key == "Enter") {
            // Do work
            event.preventDefault();
            if (playing) {
                const answer_text = document.getElementById('answer_text')
                curr_ans = answer_text.value
                answer_text.value = ""
                socket.emit('start',{'ans': curr_ans, 'counter': counter})
            }
        }
    });

    socket.on('update_samples', (data)=>{
        // update status bars
        health = $(".heart[x='0']")
        health.empty()
        health.append("<i data-feather='heart' class='filled'></i>")
        for (let i = 0; i < 3; i++) {
            health = $(".heart[x='" + i + "']")
            health.empty()
            if (i >= data['curr_health']) {
                health.append("<i data-feather='heart'></i>")
            } else {
                health.append("<i data-feather='heart' class='filled'></i>")
            }  
        }
        for (let i = 3; i < 6; i++) {
            combo = $(".heart[x='" + i + "']")
            combo.empty()
            if (i-3 >= data['curr_combo']) {
                combo.append("<i data-feather='square'></i>")
            } else {
                combo.append("<i data-feather='check-square'></i>")
            }
        }
        feather.replace()

        // if not enough health or enough combo
        sample_length = data['samples'][0].length
        if (data['curr_health'] <= 0) {
            socket.emit('lose',{'length':sample_length})
        } else if (data['curr_combo'] >= 3) {
            socket.emit('win',{'length':sample_length})
        } else {
            new_sample = data['samples'][counter].join(" ")
            sample_length = data['samples'][counter].length
            game_type = data['game_type']
            var samples_display = document.getElementById('show_samples')
            samples_display.innerHTML = '<h2>Remember the followings in ' + sample_length + ' seconds!</h2><h1>' + new_sample + '</h1>'
            
            var start_button = document.getElementById('start_button')
            start_button.style.display = "none"
            var answer = document.getElementById('answer')
            answer.style.display = "none"

            var waiting = document.getElementById('waiting')
            waiting.style.display = "block"
            
            setTimeout(function (){
                var waiting = document.getElementById('waiting')
                waiting.style.display = "none"
                var answer = document.getElementById('answer')
                answer.style.display = "flex"
                var samples_display = document.getElementById('show_samples')
                // samples_display.innerHTML = '<h2>Write down the ' + game_type + '!</h2><h1>' + $("{{placeholder}}") + '</h1>'
                samples_display.innerHTML = '<h2>Write down the ' + game_type + '! (Press Enter to Submit)</h2><h1>'+"-".repeat(sample_length)+'</h1>'
            }, 1000 * sample_length);
            counter = counter + 1
        }
    })
})