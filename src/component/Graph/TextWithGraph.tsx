import React, { useEffect } from 'react';
import { Paper, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import * as d3 from 'd3' 
import { TwoDimensionData } from '../../redux/types';

const useStyle = makeStyles((theme) => ({
    root: {
        position:"relative",
        width:300,
        height:250,
        [theme.breakpoints.down('md')]: {
            width: 200,
            height: 200,
        },
        [theme.breakpoints.down('xs')]: {
            width: 140,
            height: 200,
        },
        marginBottom: theme.spacing(1)

    },
    title: {
        position:"absolute",
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        alignSelf:"flex-start",
    },
    number: {
        position:"absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex:1,
        //background:"rgba(255,255,255,0.5)",
        //backdropFilter: "blur(1px)"
    },
    graph: {
        position:"absolute",
        top: 50,
        left:0
        
    }
}))
const TextWithGraph = (props: {title: string, data: number[]}) => {
    const classes = useStyle()
    const {title, data} = props
    console.log(data)

    useEffect(() => {
              
        const clientWidth = window.innerWidth
        let width;
        let height;
        if (clientWidth < 300) {
            width = 140
            height = 150
        } else if (clientWidth < 1280) {
            width = 200
            height = 150
        } else {
            width = 300
            height = 200
        }
  
        const padding = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
        }
        d3.select(`#graph-${title}-svg`).remove()
        const svg = d3.select(`#graph-${title}`)
            .append('svg')
            .attr('id',`graph-${title}-svg`)
            .attr('width', width + 'px')
            .attr('height', height + 'px');
        
        const maxData = d3.max(data)
        const minData = d3.min(data)

        if (maxData !== undefined && minData !== undefined) {
            const xScale = d3.scaleLinear()
                .domain([0, data.length-1])
                .range([0, width - padding.left - padding.right]);
            const yScale = d3.scaleLinear()
                .domain([minData, maxData])
                .range([height - padding.top - padding.bottom, 0]);
            const xAxis = d3.axisBottom(xScale).tickValues([])
            const yAxis = d3.axisLeft(yScale).tickValues([])
            svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
                .call(xAxis)
                .call(g => g.select(".domain").remove())
            svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
                .call(yAxis)
                .call(g => g.select(".domain").remove())
            
            const linePath = d3.line<number>()
                .x((d,i) => xScale(i))
                .y((d) => yScale(d))
                .curve(d3.curveBasis); 
            console.log(data)
            
            svg.append('path')
                .datum(data)
                .attr('class', 'line-path')
                .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
                .attr('d', linePath)
                .attr('fill', 'none')
                .attr('stroke-width', 3)
                .attr('stroke', 'rgba(0,255,0,0.2)');
        } 

    }, [data])

    return (
        <Card className={classes.root}>
            <Typography variant="h6" className={classes.title}>{title}</Typography>
            <Typography  className={classes.number} variant="h3">{data[data.length - 1]}</Typography>
            <div className={classes.graph} id={`graph-${title}`}></div>
        </Card>
    )
}

export default TextWithGraph