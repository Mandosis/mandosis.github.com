var pattern = Trianglify({
  width: window.innerWidth,
  height: window.innerHeight,
  x_colors: 'YlGnBu'
});

// document.body.appendChild(pattern.canvas())
// pattern.png(document.getElementById('container'));
var main = document.getElementsByClassName('pattern');
console.log(main);
var css = document.createAttribute('style');

// Set backgound
css.value = 'background: url(' + pattern.png() + '); background-repeat: no-repeat; background-size: auto';

main[0].setAttributeNode(css);

// document.body.append(pattern.png('pattern.png'));
