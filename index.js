
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

window.onload = function() {
    var d = document;

    let lever = d.getElementById("lever");
    
    d.getElementById("lever-left").addEventListener('click', () => {
        update_left()
    }, { once: false });
    
    d.getElementById("lever-center").addEventListener('click', () => {
        update_center()
    }, { once: false });
    
    d.getElementById("lever-right").addEventListener('click', () => {
        update_right()
    }, { once: false });

    
    var elements = {
        return_left: d.getElementById("return-left"),
        return_center: d.getElementById("return-center"),
        return_right: d.getElementById("return-right")
    };
  
    var data = {
        return_left: 0,
        return_center: 0,
        return_right: 0,
        n_left: 0,
        n_center: 0,
        n_right: 0
    };
  
    var content = {
        run: false
    };

    var bars = {
        bar_left: d.getElementById('bar_left'),
        bar_center: d.getElementById('bar_center'),
        bar_right: d.getElementById('bar_right')
    };
  
    function randn_bm(mean, std) {
        var u = 0, v = 0;
        while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        var x = mean + std * (Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v ));
        return round(x, 0);
    }

    function update_left() {
        data.n_left++;
        data.return_left = ((data.n_left - 1) * data.return_left + randn_bm(2, 1)) / data.n_left;
        elements.return_left.innerHTML = round(data.return_left, 1);

        var height = Math.min(Math.abs(data.return_left) * 100 / 5, 50)
        bars.bar_left.style.height = new String(height) + '%';

        if (data.return_left < 0) {
            bars.bar_left.style.bottom = new String(50 - height) + '%';
            bars.bar_left.style.top = '50%';
        } else {
            bars.bar_left.style.top = new String(50 - height) + '%';
            bars.bar_left.style.bottom = '50%';
        }
    }

    function update_center() {
        data.n_center++;
        data.return_center = ((data.n_center - 1) * data.return_center + randn_bm(-1.5, 1)) / data.n_center;
        elements.return_center.innerHTML = round(data.return_center, 1);

        var height = Math.min(Math.abs(data.return_center) * 100 / 5, 50)
        bars.bar_center.style.height = new String(height) + '%';

        if (data.return_center < 0) {
            bars.bar_center.style.bottom = new String(50 - height) + '%';
            bars.bar_center.style.top = '50%';
        } else {
            bars.bar_center.style.top = new String(50 - height) + '%';
            bars.bar_center.style.bottom = '50%';
        }
    }

    function update_right() {
        data.n_right++;
        data.return_right = ((data.n_right - 1) * data.return_right + randn_bm(1, 1)) / data.n_right;
        elements.return_right.innerHTML = round(data.return_right, 1);

        var height = Math.min(Math.abs(data.return_right) * 100 / 5, 50)
        bars.bar_right.style.height = new String(height) + '%';
        
        if (data.return_right < 0) {
            bars.bar_right.style.bottom = new String(50 - height) + '%';
            bars.bar_right.style.top = '50%';
        } else {
            bars.bar_right.style.top = new String(50 - height) + '%';
            bars.bar_right.style.bottom = '50%';
        }
    }
  
    function draw() {
        update_left()
        update_center()
        update_right()
        
        if (content.run === true) {
            requestAnimationFrame(draw);
        }
    }
  
    function start() {
        content.run = true;
        draw();
    }
  
    function reset() {
        content.run = false;

        data.return_left = 0;
        data.return_center = 0;
        data.return_right = 0;
        data.n_left = 0;
        data.n_center = 0;
        data.n_right = 0;

        bars.bar_left.style.height = new String(Math.abs(data.return_left) * 100 / 6) + '%';
        bars.bar_center.style.height = new String(Math.abs(data.return_center) * 100 / 6) + '%';
        // bars.bar_right.style.height = new String(Math.abs(data.return_right) * 100 / 6) + '%';

        elements.return_left.innerHTML = round(data.return_left, 1);
        elements.return_center.innerHTML = round(data.return_center, 1);
        elements.return_right.innerHTML = round(data.return_right, 1);
        
        d.getElementById("start").style.display = "inline";
    }
  
    d.getElementById("start").onclick = function() {
        start();
    };
  
    d.getElementById("act").onclick = function() {
        run_estimate();
    };

    d.getElementById("stop").onclick = function() {
        content.run = false;
    };
  
    d.getElementById("reset").onclick = function() {
        reset();
        setTimeout(function() {
            reset();
        }, 1);
    };

    
  };
  