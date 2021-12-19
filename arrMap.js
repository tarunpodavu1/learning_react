const schools = ['yorktown', 'washington & liberty', 'wakefield'];

const highSchools = schools.map(school => `${school} High`);
console.log(highSchools);
console.log(schools);

const highSchoolObj = schools.map(school => ({name: school}));
console.log(highSchoolObj);

let colleges = [
    {name:'York'},
    {name:'Washington'},
    {name:'Wakefield'},
    {name:'Stratford'}
];

// const editName = (oldName, name, arr) =>
//  arr.map(item => {if(item.name === oldName){
//                     return {
//                             ...item,
//                             name
//                         };
//                     }
//                     else{
//                             return item;
//                         }  
//                     });

const editName = (oldName, name, arr) => arr.map(item => (item.name === oldName ? {...item, name}: item));                  

let updatedColleges = editName("Stratford", "Hogwarts", colleges);

console.log(updatedColleges[3]);
console.log(colleges[3]);


const schools2 = {
    Yorktown: 10,
    'Washington & Liberty': 2,
    Wakefield: 5
};

const schoolArray = Object.keys(schools2).map(key => ({
    name: key,
    wins: schools2[key]
}));

console.log(schoolArray);

