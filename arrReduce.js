const ages = [21, 18, 42, 40, 64, 63, 34];

const maxAge = ages.reduce((max, age) =>{
    if(age>max)
        return age;
    else
        return max;    
},0);

console.log("Max Age :", maxAge);


const colors = [
    {
        id: 'xekare',
        title: 'rad red',
        rating: 3
    },
    {
        id: 'jbws',
        title: 'blue',
        rating: 2
    },
    {
        id: 'prigh',
        title: 'grizzle',
        rating: 5
    }
];

console.log(colors);

const hashColors = colors.reduce((hash, {id, title, rating}) => {
    hash[id] = {title, rating}; 
    return hash;
},{});

console.log(hashColors);

const redColors = ['red', 'red', 'green', 'blue', 'green'];

const uniqueColors = redColors.reduce(
    (unique, color) =>
        unique.indexOf(color) !== -1 ? unique: [...unique, color],
    []    
);

console.log(uniqueColors);