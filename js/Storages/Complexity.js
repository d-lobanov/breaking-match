import Storage from "./Storage.js";

const COMPLEXITY_MAPPING = [
    {
        'id': '0',
        'rows': 3,
        'columns': 4,
    },
    {
        'id': '1',
        'rows': 3,
        'columns': 6,
    },
    {
        'id': '2',
        'rows': 3,
        'columns': 8,
    },
];

class Complexity {
    all() {
        return COMPLEXITY_MAPPING.map(i => {
            i.caption = '[ ' + i.rows + ' x ' + i.columns + ' ]';
            i.style = 'complexity-' + i.id;

            return i;
        });
    }

    id() {
        return Storage.get('complexity.id', 1);
    }

    rows() {
        return Storage.get('complexity.rows', 3);
    }

    columns() {
        return Storage.get('complexity.columns', 4);
    }

    set (id) {
        Storage.set('complexity', COMPLEXITY_MAPPING.find(i => i.id === id));
    }

}

export default new Complexity();
