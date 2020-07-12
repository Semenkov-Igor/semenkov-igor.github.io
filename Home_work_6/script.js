const students = [
    {
        name: 'John Smith',
        marks: [10, 8, 6, 9, 8, 7 ]
    },
    {
        name: 'John Doe',
        marks: [ 9, 8, 7, 6, 7 ]
    },
    {
        name: 'Thomas Anderson',
        marks: [6, 7, 10, 8 ]
    },
    {
        name: 'Jean-Baptiste Emanuel Zorg',
        marks: [10, 9, 8, 9 ]
    }
]

const allMarks = getAllMarks(students); 
const groupAverage = averageGroupRating(allMarks);

studentAverageMark(students);
function studentAverageMark(groupList) {
    groupList.forEach((student) => {
        const averageMark = student.marks.reduce((acc, mark) => acc + mark) / student.marks.length;

        console.log('Студент ' + student.name, ', средний балл: ' + averageMark);
    });
}

function getAllMarks(studentsMarks) {
    return studentsMarks.reduce((acc, student) => [...acc, ...student.marks], []);
}

function averageGroupRating(marks) {
    return marks.reduce((acc, mark) => (acc + mark)) / allMarks.length;
}

console.log('Средний балл группы: ' + groupAverage);

