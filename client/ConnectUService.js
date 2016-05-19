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
  };

  var user3 = {
    email: 'Suzanna@gmail.com',
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
  };


  return {
    user1: user1,
    user2: user2,
    user3: user3,
    user4: user4
  }


});//closes app.factory()
