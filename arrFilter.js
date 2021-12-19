const schools = ['yorktown', 'washington & liberty', 'wakefield'];

console.log(schools.join(", "));

const wSchools = schools.filter(school => school[0] == "w");
console.log(wSchools);

const cutSchool = (cut, list) => list.filter(school => school != cut);
console.log(cutSchool('wakefield', schools));
