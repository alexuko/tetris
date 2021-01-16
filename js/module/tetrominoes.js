// Canvas measures
export const COL = 10;
export const ROW = 22;
export const SQ = 20;

export let tetrominoes = [
    // [0] T-tetrominoe
    [
  
        [ 
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [ 
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0]
        ],
        [ 
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ],
        [   
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
    ],
    // [1] L-tetrominoe
    [
        
        [ 
            [0, 0, 2],
            [2, 2, 2],
            [0, 0, 0]
        ],
        [ 
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2]
        ],
        [ 
            [0, 0, 0],
            [2, 2, 2],
            [2, 0, 0]
        ],
        [ 
            [2, 2, 0],
            [0, 2, 0],
            [0, 2, 0]
        ]
    ],
    // [2] J-tetrominoe
    [
        [ 
            [3, 0, 0],
            [3, 3, 3],
            [0, 0, 0]
        ],
        [ 
            [0, 3, 3],
            [0, 3, 0],
            [0, 3, 0]
        ],
        [ 
            [0, 0, 0],
            [3, 3, 3],
            [0, 0, 3]
        ],
        [ 
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0]
        ]
    ],
    // [3] S-tetrominoe
    [   
        [ 
            [0, 4, 4],
            [4, 4, 0],
            [0, 0, 0]
        ],
        [   
            [0, 4, 0],
            [0, 4, 4],
            [0, 0, 4]
        ],
        [   
            [0, 0, 0],
            [0, 4, 4],
            [4, 4, 0]
        ],
        [ 
            [4, 0, 0],
            [4, 4, 0],
            [0, 4, 0]
        ]
        
    ],
    // [4] Z-tetrominoe
    [
        [ 
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0]
        ],
        [   
            [0, 0, 5],
            [0, 5, 5],
            [0, 5, 0]
        ],
        [ 
            [0, 0, 0],
            [5, 5, 0],
            [0, 5, 5]
        ],
        [ 
            [0, 5, 0],
            [5, 5, 0],
            [5, 0, 0]
        ],
    ],
    [   
        [   
            [0, 0, 0, 0],
            [0, 6, 6, 0],
            [0, 6, 6, 0],
            [0, 0, 0, 0]
        ]
    ],
    // [6] I-tetrominoe
    [   
        [
            [0, 0, 0, 0],
            [7, 7, 7, 7],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        ,
        [
            [0, 0, 7, 0],
            [0, 0, 7, 0],
            [0, 0, 7, 0],
            [0, 0, 7, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [7, 7, 7, 7],
            [0, 0, 0, 0]
        ],
        [
            [0, 7, 0, 0],
            [0, 7, 0, 0],
            [0, 7, 0, 0],
            [0, 7, 0, 0]
        ]
    ]

]

