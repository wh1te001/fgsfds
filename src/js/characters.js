const characters = [
  // prettier-ignore
  new Character(
    'Hanyuu',
    'clickableImageHanyuu',
    {
      default: {
        idle: 'HanyuuOG_(1).webp',
        clicked: 'HanyuuOG_(6).webp'
      }
    },
    'src/nanodesu.mp3'
  ),
  new Character(
    'Rika',
    'clickableImage',
    {
      default: {
        idle: 'RikaOG_(1).webp',
        clicked: 'RikaOG_(4).webp'
      },
      watanagashi: {
        idle: 'Rika_Watanagashi__idle.webp',
        idle: 'Rika_Watanagashi__happy.webp'
      },
      halloween: {
        idle: 'Rika_Default.webp',
        clicked: 'Rika_Happy.webp'
      },
      newyear: {
        idle: 'Rika__Default_NY.png',
        clicked: 'Rika__Happy_NY.png'
      }
    },
    'src/nipah.MP3'
  )
];

const container = document.querySelector('.retard-container');
characters.forEach((character) => character.render(container));
