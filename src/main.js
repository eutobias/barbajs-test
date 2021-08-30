import barba from '@barba/core';
import barbaRouter from '@barba/router';
import anime from 'animejs'

document.addEventListener('DOMContentLoaded', () => {
  console.log("Ready")

  // document.querySelectorAll('a').forEach((link) => {
  //   link.addEventListener('click', (e) => {
  //     console.log(e)
  //     e.preventDefault()
  //     // e.stopPropagation()
  //     return false
  //   })
  // })

  const myRoutes = [
    { name: 'home', path: '/index.html' },
    { name: 'about', path: '/about.html' }
  ]

  barba.use(barbaRouter, {
    routes: myRoutes
  });

  barba.hooks.enter((data) => {
    // console.log('enter');
    // console.log({ data });
    window.scrollTo(0, 0);
  });

  barba.hooks.after(() => {
    // console.log('after');
  });

  barba.init({
    preventRunning: true,
    transitions: [{
      name: 'general-transition',
      leave: (data) => {
        return new Promise((resolve, reject) => {
          anime({
            targets: '.transition',
            translateX: ['-100%', 0],
            duration: 750,
            easing: 'easeInOutQuad',
            update: (a) => {
              console.log('leave: ', a.progress)
            },
            complete: () => {
              data.current.container.style.display="none";
              resolve()
            }
          })
        })
      },
      enter(data) {
        return new Promise((resolve, reject) => {
          anime({
            targets: '.transition',
            translateX: [0, '100%'],
            duration: 750,
            easing: 'easeInOutQuad',
            update: (a) => {
              console.log('enter: ', a.progress)
            },
            complete: () => {
              console.log('enter complete')
              resolve()
            }
          })
        })
      },
    }]
  });

})