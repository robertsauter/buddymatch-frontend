import { FilterOtion } from "../interfaces/filter-option";

type FilterOptions = {
    studyPrograms: FilterOtion[];
    courses: FilterOtion[];
    skills: FilterOtion[];
}

export const filterOptions: FilterOptions = {
    studyPrograms: [
        {
            name: 'komedia',
            displayName: 'Komedia',
        },
        {
            name: 'info',
            displayName: 'Computer science',
        }
    ],
    courses: [
        {
            name: 'awt',
            displayName: 'Advanced web technologies',
        },
        {
            name: 'ile',
            displayName: 'Intelligent learning environments',
        }
    ],
    skills: [
        {
            name: 'js',
            displayName: 'JavaScript'
        },
        {
            name: 'python',
            displayName: 'Python'
        }
    ]
};