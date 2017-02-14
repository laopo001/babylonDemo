// var canvas = <HTMLCanvasElement>document.querySelector("#renderCanvas");
// var ctx = canvas.getContext('2d');

// function autoSAVE(target, name?, descriptor?) {
//     if (typeof arguments[0] === 'function' && arguments.length === 1) {
//         var cb = arguments[0];
//         return function () {
//             ctx.save()
//             cb();
//             ctx.restore();
//         };
//     }
//     var oldValue = descriptor.value;
//     descriptor.value = function () {
//         ctx.save()
//         oldValue.apply(null, arguments);
//         ctx.restore();
//     };
//     return descriptor;
// }

// // ctx.globalAlpha = 0.2;


// interface position {
//     x: number;
//     y: number;
// }

// class draw {
//     @autoSAVE
//     static init(img: any) {
//         // ctx.save();
//         ctx.globalAlpha = 0.2;
//         ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
//         //ctx.restore();
//     }

//     static line(from: position, to: position, color: string = 'green') {

//         let from_line: position = { x: from.x, y: from.y };
//         let to_line: position = { x: from.x, y: from.y };

//         new TWEEN.Tween(to_line).to(to, 1000).easing(TWEEN.Easing.Linear.None).delay(100).onUpdate(autoSAVE(function () {
//             //ctx.save()
//             ctx.lineCap = "round";
//             ctx.lineWidth = 5;
//             ctx.globalAlpha = 0.4;
//             ctx.strokeStyle = color;
//             ctx.beginPath();
//             //   ctx.arc(to_line.x, to_line.y, 5, 0, 2 * Math.PI);
//             ctx.moveTo(from_line.x, from_line.y);
//             ctx.lineTo(to_line.x, to_line.y);
//             ctx.closePath();
//             ctx.stroke();
//             // from_line.x = from.x;
//             // from_line.y = from.y;
//             //ctx.restore();
//         })).start().onComplete(function () {

//             var f = { r: 1 };
//             var i = 0;
//             new TWEEN.Tween(f).to({ r: 100 }, 2000).easing(TWEEN.Easing.Linear.None).onUpdate(autoSAVE(function () {
//                 // ctx.globalCompositeOperation="source-out";

//                 ctx.lineWidth = 3;
//                 ctx.globalAlpha = 0.1;
//                 ctx.strokeStyle = color;
//                 ctx.beginPath();
//                 ctx.arc(to.x, to.y, f.r, 0, 2 * Math.PI);
//                 ctx.stroke();


//             })).start();
//         })
//         new TWEEN.Tween(from_line).to(to, 1000).easing(TWEEN.Easing.Linear.None).start();
//     }
//     static Random() {
//         var from = { x: Math.random() * 1000, y: Math.random() * 600 }
//         var to = { x: Math.random() * 1000, y: Math.random() * 600 }
//         this.line(from, to, '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6))
//     }
// }


// async function loadImg(url: string) {
//     return new Promise((resolve, reject) => {
//         var img = new Image()
//         img.src = url;
//         img.onload = function () {
//             resolve(img);
//         }
//     });
// }

// (async function () {
//     let bg = await loadImg("img/bg.jpg");
//     draw.init(bg);
//     //  draw.line({ x: 0, y: 0 }, { x: 550, y: 550 }, "red")
//     //   setInterval(function(){
//     //       draw.Random()
//     //   },500)


//     ///////
//     animate();
//     var a = 0;
//     function animate() {
//         requestAnimationFrame(animate);
//         a++;
//         if (a % 5 === 0) {
//             draw.init(bg);
//         }
//         if (a % 30 === 0) {
//             draw.Random()
//         }
//         TWEEN.update();

//     }


// })();


// // Promise.all([load_bg]).then((result)=>{
// //     init(result[0])
// // })