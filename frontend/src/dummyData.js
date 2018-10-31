const movies = [
  {
    id: 260513,
    name: 'Incredibles 2',
    score: 7.6,
    poster_path: 'https://image.tmdb.org/t/p/w500/x1txcDXkcM65gl7w20PwYSxAYah.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/mabuNsGJgRuCTuGqjFkWe1xdu19.jpg',
    genre_ids: [28, 12, 16, 10751],
    overview:
      'Elastigirl springs into action to save the day, while Mr. Incredible faces his greatest challenge yet – taking care of the problems of his three children.',
    date: '2018-06-14',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=ZJDMWVZta3M',
  },
  {
    id: 420814,
    name: 'Christopher Robin',
    score: 7.8,
    poster_path: 'https://image.tmdb.org/t/p/w500/xR5w0he6czZkcAz459a4iPBqXGe.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/uDt8bQ4lGVlabEx5Gl2cPzvy6qz.jpg',
    genre_ids: [12, 16, 35, 10751],
    overview:
      'Working-class family man Christopher Robin encounters his childhood friend Winnie-the-Pooh, who helps him to rediscover the joys of life.',
    date: '2018-08-02',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=425M4M3Opkk',
  },
  {
    id: 399360,
    name: 'Alpha',
    score: 5.2,
    poster_path: 'https://image.tmdb.org/t/p/w500/afdZAIcAQscziqVtsEoh2PwsYTW.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/nKMeTdm72LQ756Eq20uTjF1zDXu.jpg',
    genre_ids: [12, 18],
    overview:
      'After a hunting expedition goes awry, a young caveman struggles against the elements to find his way home.',
    date: '2018-08-17',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=uIxnTi4GmCo',
  },
  {
    id: 363088,
    name: 'Ant-Man and the Wasp',
    score: 7,
    poster_path: 'https://image.tmdb.org/t/p/w500/rv1AWImgx386ULjcf62VYaW8zSt.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/6P3c80EOm7BodndGBUAJHHsHKrp.jpg',
    genre_ids: [28, 12, 35, 878, 10749, 10751],
    overview:
      'Just when his time under house arrest is about to end, Scott Lang puts again his freedom at risk to help Hope van Dyne and Dr. Hank Pym dive into the quantum realm and try to accomplish, against time and any chance of success, a very dangerous rescue mission.',
    date: '2018-07-04',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=Ew7hvsnSbAY',
  },
  {
    id: 79242,
    name: 'Chilling Adventures of Sabrina',
    score: 6.5,
    poster_path: 'https://image.tmdb.org/t/p/w500/yxMpoHO0CXP5o9gB7IfsciilQS4.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/8AdmUPTyidDebwIuakqkSt6u1II.jpg',
    genre_ids: [9648, 10765],
    overview:
      'As her 16th birthday nears, Sabrina must choose between the witch world of her family and the human world of her friends. Based on the Archie comic.',
    date: '2018-10-26',
    type: 'tv',
    trailer: 'https://youtube.com/watch?v=Ab_rXrgk5R4',
  },
  {
    id: 347375,
    name: 'Mile 22',
    score: 5.7,
    poster_path: 'https://image.tmdb.org/t/p/w500/ptSrT1JwZFWGhjSpYUtJaasQrh.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/2nOMUnQ4OtsKVTmpp3og7MYt4oG.jpg',
    genre_ids: [28],
    overview:
      'A CIA field officer and an Indonesian police officer are forced to work together in confronting political corruption. An informant must be moved twenty-two miles to safety.',
    date: '2018-08-16',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=3CVV8X01824',
  },
  {
    id: 458423,
    name: 'Mamma Mia! Here We Go Again',
    score: 7.5,
    poster_path: 'https://image.tmdb.org/t/p/w500/v2KnosS7G2M9pMymvX0XXTcf04c.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/kAErJpVU4ul9R3VzroM8awWrlT2.jpg',
    genre_ids: [35, 10402, 10749],
    overview:
      'Five years after meeting her three fathers, Sophie Sheridan prepares to open her mother’s hotel. In 1979, young Donna Sheridan meets the men who each could be Sophie’s biological father.',
    date: '2018-07-18',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=XcSMdhfKga4',
  },
  {
    id: 487558,
    name: 'BlacKkKlansman',
    score: 7.5,
    poster_path: 'https://image.tmdb.org/t/p/w500/bT5WuAsjDJYQv2vXbWGDQTmjKav.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/gMVdhfQ7q9DFHhDkehrququjGPd.jpg',
    genre_ids: [35, 80, 18],
    overview:
      'Ron Stallworth, an African-American police officer from Colorado, successfully manages to infiltrate the local Ku Klux Klan and become the head of the local chapter.',
    date: '2018-08-09',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=pFc6I0rgmgY',
  },
  {
    id: 445651,
    name: 'The Darkest Minds',
    score: 6.8,
    poster_path: 'https://image.tmdb.org/t/p/w500/94RaS52zmsqaiAe1TG20pdbJCZr.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/5BxrMNGl3YDiWgHCVJu8iLQoJDM.jpg',
    genre_ids: [878, 53],
    overview:
      "After a disease kills 98% of America's children, the surviving 2% develop superpowers and are placed in internment camps. A 16-year-old girl escapes her camp and joins a group of other teens on the run from the government.",
    date: '2018-08-02',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=tN8o_E_f9FQ',
  },
  {
    id: 438590,
    name: 'A.X.L.',
    score: 4.5,
    poster_path: 'https://image.tmdb.org/t/p/w500/9kB56ZdMB6RgY5QtX9Bar45jCeI.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/l1nYo0yzKjf84atnBDbx0do16vQ.jpg',
    genre_ids: [28, 12, 878, 10751],
    overview:
      'The life of a teenage boy is forever altered by a chance encounter with cutting edge military technology.',
    date: '2018-08-16',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=--8nr2kt4uk',
  },
  {
    id: 79460,
    name: 'Legacies',
    score: 4.7,
    poster_path: 'https://image.tmdb.org/t/p/w500/pwvKOtTpbMacI463EDfyKtfn4Kd.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/h4yjTXpFHv98bmTQxdmWTrRVNUP.jpg',
    genre_ids: [18, 9648, 10759, 10765],
    overview:
      'In a place where young witches, vampires, and werewolves are nurtured to be their best selves in spite of their worst impulses, Klaus Mikaelson’s daughter, 17-year-old Hope Mikaelson, Alaric Saltzman’s twins, Lizzie and Josie Saltzman, among others, come of age into heroes and villains at The Salvatore School for the Young and Gifted.',
    date: '2018-10-25',
    type: 'tv',
    trailer: 'https://youtube.com/watch?v=ZrGP4tyHqCA',
  },
  {
    id: 454992,
    name: 'The Spy Who Dumped Me',
    score: 6.4,
    poster_path: 'https://image.tmdb.org/t/p/w1280/2lIr27lBdxCpzYDl6WUHzzD6l6H.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/uN6v3Hz4qI2CIqT1Ro4vPgAbub3.jpg',
    genre_ids: [28, 12, 35],
    overview:
      'Audrey and Morgan are best friends who unwittingly become entangled in an international conspiracy when one of the women discovers the boyfriend who dumped her was actually a spy.',
    date: '2018-08-02',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=OZsYiWBgFOk',
  },
  {
    id: 522417,
    name: 'The Scorpion King: Book of Souls',
    score: 6.9,
    poster_path: 'https://image.tmdb.org/t/p/w500/mSviUMejPmerwoQxdj7wR4Ky1Fd.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/tw4iYlxu0FIX4kmlFlprScdSfeA.jpg',
    genre_ids: [28, 12, 14],
    overview:
      'The Scorpion King teams up with a female warrior named Tala, who is the sister of The Nubian King. Together they search for a legendary relic known as The Book of Souls, which will allow them to put an end to an evil warlord.',
    date: '2018-10-23',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=anvnDpxWyJc',
  },
  {
    id: 345934,
    name: 'The Bombing',
    score: 0,
    poster_path: 'https://image.tmdb.org/t/p/w500/uzcqkLNCI2Tjqscc9dr1TxURzAn.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/8Rn4RNhZW88X5LlxTD7ldv8Q7QL.jpg',
    genre_ids: [28, 12, 18, 10752],
    overview:
      'An American pilot is sent to a Chinese province to teach a crew of would-be pilots how to fly war planes against the Japanese during World War II.',
    date: '2018-10-26',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=BgIJfoo0n9Q',
  },
  {
    id: 424139,
    name: 'Halloween',
    score: 6.7,
    poster_path: 'https://image.tmdb.org/t/p/w500/lNkDYKmrVem1J0aAfCnQlJOCKnT.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/tZ358Wk4BnOc4FjdGsiexAUvCMH.jpg',
    genre_ids: [27, 53],
    overview:
      'Laurie Strode comes to her final confrontation with Michael Myers, the masked figure who has haunted her since she narrowly escaped his killing spree on Halloween night four decades ago.',
    date: '2018-10-18',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=ek1ePFp-nBI',
  },
  {
    id: 348350,
    name: 'Solo: A Star Wars Story',
    score: 6.7,
    poster_path: 'https://image.tmdb.org/t/p/w500/3IGbjc5ZC5yxim5W0sFING2kdcz.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/5DUqFLgkLsJxyqPCAcgTivZy2SX.jpg',
    genre_ids: [28, 12, 878],
    overview:
      'Through a series of daring escapades deep within a dark and dangerous criminal underworld, Han Solo meets his mighty future copilot Chewbacca and encounters the notorious gambler Lando Calrissian.',
    date: '2018-05-15',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=dNW0B0HsvVs',
  },
  {
    id: 462469,
    name: 'Been So Long',
    score: 8,
    poster_path: 'https://image.tmdb.org/t/p/w500/a3dqNHMfbVxiiRafVLay87JljK7.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/uuexlPWWsV3nbEkuIaYKWa9Nv6P.jpg',
    genre_ids: [18, 10402],
    overview:
      'A dedicated single mother, on an unusual night on the town, is charmed by a handsome yet troubled stranger.',
    date: '2018-10-12',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=tflC2Jr6scs',
  },
  {
    id: 351286,
    name: 'Jurassic World: Fallen Kingdom',
    score: 6.5,
    poster_path: 'https://image.tmdb.org/t/p/w500/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/3s9O5af2xWKWR5JzP2iJZpZeQQg.jpg',
    genre_ids: [28, 12, 878],
    overview:
      'Three years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the isla Nublar, so Claire Dearing, the former park manager, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.',
    date: '2018-06-06',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=vn9mMeWcgoM',
  },
  {
    id: 299536,
    name: 'Avengers: Infinity War',
    score: 8.3,
    poster_path: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/lmZFxXgJE3vgrciwuDib0N8CfQo.jpg',
    genre_ids: [28, 12, 14, 878],
    overview:
      'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.',
    date: '2018-04-25',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=6ZfuNTqbHE8',
  },
  {
    id: 455980,
    name: 'Tag',
    score: 6.8,
    poster_path: 'https://image.tmdb.org/t/p/w500/eXXpuW2xaq5Aen9N5prFlARVIvr.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w500/yRXzrwLfB5tDTIA3lSU9S3N9RUK.jpg',
    genre_ids: [35, 18],
    overview:
      'For one month every year, five highly competitive friends hit the ground running in a no-holds-barred game of tag they’ve been playing since the first grade. This year, the game coincides with the wedding of their only undefeated player, which should finally make him an easy target. But he knows they’re coming...and he’s ready.',
    date: '2018-05-30',
    type: 'movie',
    trailer: 'https://youtube.com/watch?v=kjC1zmZo30U',
  },
];


const searchResults = [
  {
    title: 'Movies',
    data: [
      {
        movie: 'Jurasic Park',
        genre: ['Horror', 'dino'],
        movie_poster_url: 'https://image.tmdb.org/t/p/w500/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
      },
      {
        movie: 'Two and Half men',
        genre: ['Drugs', 'Commedy'],
        movie_poster_url: 'https://image.tmdb.org/t/p/w500/eXXpuW2xaq5Aen9N5prFlARVIvr.jpg',
      }, {
        movie: 'Jurasic Park',
        genre: ['Horror', 'dino'],
        movie_poster_url: 'https://image.tmdb.org/t/p/w500/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
      },
      {
        movie: 'Two and Half men',
        genre: ['Drugs', 'Commedy'],
        movie_poster_url: 'https://image.tmdb.org/t/p/w500/eXXpuW2xaq5Aen9N5prFlARVIvr.jpg',
      }, {
        movie: 'Jurasic Park',
        genre: ['Horror', 'dino'],
        movie_poster_url: 'https://image.tmdb.org/t/p/w500/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
      },
      {
        movie: 'Two and Half men',
        genre: ['Drugs', 'Commedy'],
        movie_poster_url: 'https://image.tmdb.org/t/p/w500/eXXpuW2xaq5Aen9N5prFlARVIvr.jpg',
      },
    ]
  },
  {
    title: 'Actors',
    data: [
      {
        actor: 'Michael Douglas',
        role: ['Actor', 'Producer'],
        actor_photo_url: 'https://www.biography.com/.image/t_share/MTE5NTU2MzE2MjA0OTI2NDc1/michael-douglas-9278088-1-402.jpg'
      },
      {
        actor: 'Charlie Sheen',
        role: ['Actor', 'Producer'],
        actor_photo_url: 'https://m.media-amazon.com/images/M/MV5BMTIyNDQ5Nzk2OF5BMl5BanBnXkFtZTcwODU4MTU5MQ@@._V1_UX214_CR0,0,214,317_AL_.jpg'
      },
      {
        actor: 'keanu reeves',
        role: ['Actor', 'Legend'],
        actor_photo_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxMjE0MDY0Ml5BMl5BanBnXkFtZTgwNTI0OTcyMDI@._CR2554,398,788,788_UX402_UY402._SY201_SX201_AL_.jpg'
      }, {
        actor: 'Michael Douglas',
        role: ['Actor', 'Producer'],
        actor_photo_url: 'https://www.biography.com/.image/t_share/MTE5NTU2MzE2MjA0OTI2NDc1/michael-douglas-9278088-1-402.jpg'
      },
      {
        actor: 'Charlie Sheen',
        role: ['Actor', 'Producer'],
        actor_photo_url: 'https://m.media-amazon.com/images/M/MV5BMTIyNDQ5Nzk2OF5BMl5BanBnXkFtZTcwODU4MTU5MQ@@._V1_UX214_CR0,0,214,317_AL_.jpg'
      },
      {
        actor: 'keanu reeves',
        role: ['Actor', 'Legend'],
        actor_photo_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxMjE0MDY0Ml5BMl5BanBnXkFtZTgwNTI0OTcyMDI@._CR2554,398,788,788_UX402_UY402._SY201_SX201_AL_.jpg'
      }
    ]
  }
]




const getSingleMovie = () => movies[0];

const getAllMovies = () => movies;

const getSearchResults = () => searchResults;

export { getSingleMovie, getAllMovies, getSearchResults };