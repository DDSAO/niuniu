import React from 'react';
import { Container } from '@material-ui/core';
import TextWithGraph from '../component/Graph/TextWithGraph';

import faker from 'faker'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

    outline: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        flexWrap:"wrap",
        margin:0
    }
}))

const Dashboard = () => {
    const classes = useStyles()
    
    const data1: number[] = []
    const data2: number[] = []
    const data3: number[] = []
    const data4: number[] = []
    for (let i = 0; i < 10; i ++) {
        data1[i] = faker.random.number({min:0,max:100})
        data2[i] = faker.random.number({min:0,max:100})
        data3[i] = faker.random.number({min:0,max:100})
        data4[i] = faker.random.number({min:0,max:100})
    }

    return(
        <Container disableGutters>
            <Container className={classes.outline} disableGutters>
                <TextWithGraph title="学生总数" data={data1} />
                <TextWithGraph title="历史课时" data={data2} />
                <TextWithGraph title="活跃学生" data={data3} />
                <TextWithGraph title="剩余课程" data={data4} />
            </Container>
            
           
        </Container>
    )
}

export default Dashboard