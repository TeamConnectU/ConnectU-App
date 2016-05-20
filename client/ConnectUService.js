angular.module('connectUApp')
  .factory('ConnectUService', function(){

  var user1 = {
    email: 'oliverbrummel1@gmail.com',
    first_name: 'Oliver',
    last_name: 'Brummel',
    city: 'Minneapolis',
    state: 'Minnesota',
    phone: '612-910-7406',
    high_school: 'South High School',
    college: 'University of Minnesota',
    current_workplace: 'Prime Academy',
    linkedin_url: 'www.linkedin.com/oliverbrummel',
    focus: 'Software Developing',
    quote: 'This quote is very meaningful',
    seeking_internship: true,
    seeking_employment: true,
    admin: false,
    photo_url: "https://scontent.xx.fbcdn.net/v/t1.0-9/1723404_10205413741884455_4098320721678136536_n.jpg?oh=8848e1f58c2d8611725b5b6fa4cc7037&oe=57E5E5C2"
  };

  var user2 = {
    email: 'Suzanna@gmail.com',
    first_name: 'Suzanna',
    last_name: 'Altman',
    city: 'Minneapolis',
    state: 'Minnesota',
    phone: '612-555-1010',
    high_school: 'Some High School',
    college: 'Harvard University',
    current_workplace: 'Prime Academy',
    linkedin_url: 'www.linkedin.com/SuzieQ',
    focus: 'Software Developing',
    quote: 'Hi, I\'m Suzanna and I bike to Prime!',
    seeking_internship: false,
    seeking_employment: true,
    admin: false,
    photo_url: "https://scontent.xx.fbcdn.net/v/t1.0-9/12923114_10154034892457278_4682748302341015996_n.jpg?oh=bb588ae6a14d490a7ccc9f7c17808cd0&oe=57D89E5B"
  };

  var user3 = {
    email: 'Erika@gmail.com',
    first_name: 'Erika',
    last_name: 'Klein',
    city: 'Minneapolis',
    state: 'Minnesota',
    phone: '612-555-3000',
    high_school: 'Another High School',
    college: 'Yale University',
    current_workplace: 'Prime Academy',
    linkedin_url: 'www.linkedin.com/erikaklein',
    focus: 'Software Developing',
    quote: 'Hi, I\'m Erika and I\'m a Balsamiq God',
    seeking_internship: true,
    seeking_employment: false,
    admin: false,
    photo_url: "https://scontent.xx.fbcdn.net/v/t1.0-9/12495012_10153864383727002_5184833811162327650_n.jpg?oh=8c36e4a8ed1d654a659e5ab45ec90806&oe=57D55E09"
  };

  var user4 = {
    email: 'maxpower@gmail.com',
    first_name: 'Max',
    last_name: 'Power',
    city: 'Minneapolis',
    state: 'Minnesota',
    phone: 'Top Secret',
    high_school: 'Yet Another High School',
    college: 'MIT',
    current_workplace: 'Prime Academy',
    linkedin_url: 'www.linkedin.com/maxpower',
    focus: 'Software Developing',
    quote: 'You belong to ME now...',
    seeking_internship: false,
    seeking_employment: false,
    admin: true,
    photo_url: "https://scontent.xx.fbcdn.net/v/t1.0-9/12472231_766327402117_1243867241360422927_n.jpg?oh=002a0aa80ed8f0c86e550c06f17fe33f&oe=579D83FC"
  };


  return {
    user1: user1,
    user2: user2,
    user3: user3,
    user4: user4
  }


});//closes app.factory()
