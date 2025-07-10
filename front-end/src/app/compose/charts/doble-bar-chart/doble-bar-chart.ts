import { Component, ElementRef, ViewChild, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Simplified interface for just two values
interface ChartData {
  value1: number;
  value2: number;
}

@Component({
  selector: 'app-doble-bar-chart',
  templateUrl: './doble-bar-chart.html',
  styleUrls: ['./doble-bar-chart.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DobleBarChart {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  // Change from @Input to input() function
  value1 = input<number>(0);
  value2 = input<number>(0);
  title = input<string>('Doble Bar Chart');
  xAxisLabel = input<string>('Categories');
  yAxisLabel = input<string>('Values');
  firstDatasetLabel = input<string>('Dataset 1');
  secondDatasetLabel = input<string>('Dataset 2');
  
  private ctx!: CanvasRenderingContext2D;
  private chart = {
    padding: { top: 20, right: 20, bottom: 50, left: 60 },
    barColors: ['#4e79a7', '#f28e2c'],
    barWidth: 80, // Wider bars since we only have two
    barGap: 100, // Larger gap between the two bars
    axisColor: '#888',
    gridColor: '#eee',
    textColor: '#333',
    animationSpeed: 10,
    currentAnimationStep: 0,
    totalAnimationSteps: 60,
    animatedValues: [0, 0], // Just two values now
  };
  
  constructor() {
    // Add effect to watch for value changes
    effect(() => {
      // Access values to register dependencies
      const v1 = this.value1();
      const v2 = this.value2();
      
      // Skip if context isn't initialized yet
      if (!this.ctx) return;
      
      this.initAnimatedValues();
      this.drawChart();
      this.animateChart();
    });
  }
  
  ngOnInit(): void {
    this.ctx = this.chartCanvas.nativeElement.getContext('2d')!;
    this.initAnimatedValues();
    this.drawChart();
    this.animateChart();
  }
  
  private initAnimatedValues(): void {
    this.chart.currentAnimationStep = 0;
    this.chart.animatedValues = [0, 0];
  }
  
  private animateChart(): void {
    if (this.chart.currentAnimationStep < this.chart.totalAnimationSteps) {
      this.chart.currentAnimationStep++;
      
      // Update animated values - now using input signals with ()
      this.chart.animatedValues[0] = (this.value1() / this.chart.totalAnimationSteps) * this.chart.currentAnimationStep;
      this.chart.animatedValues[1] = (this.value2() / this.chart.totalAnimationSteps) * this.chart.currentAnimationStep;
      
      this.drawChart();
      requestAnimationFrame(() => this.animateChart());
    }
  }
  
  private drawChart(): void {
    const canvas = this.chartCanvas.nativeElement;
    const { width, height } = canvas;
    const { padding, barWidth, barGap } = this.chart;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);
    
    // Draw chart background
    this.ctx.fillStyle = '#f9f9f9';
    this.ctx.fillRect(0, 0, width, height);
    
    // Calculate chart dimensions
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    // Find max value for scaling - now using input signals with ()
    const maxValue = Math.max(this.value1(), this.value2(), 10); // Minimum scale of 10 for empty charts
    
    // Calculate scale for y-axis
    const yScale = chartHeight / (maxValue * 1.1); // Add 10% padding at top
    
    // Draw y-axis grid lines and labels
    const numGridLines = 5;
    this.ctx.strokeStyle = this.chart.gridColor;
    this.ctx.fillStyle = this.chart.textColor;
    this.ctx.font = '12px Arial';
    this.ctx.textAlign = 'right';
    
    for (let i = 0; i <= numGridLines; i++) {
      const value = (maxValue / numGridLines) * i;
      const y = height - padding.bottom - (value * yScale);
      
      // Grid line
      this.ctx.beginPath();
      this.ctx.moveTo(padding.left, y);
      this.ctx.lineTo(width - padding.right, y);
      this.ctx.stroke();
      
      // Label
      this.ctx.fillText(value.toFixed(0), padding.left - 10, y + 4);
    }
    
    // Draw x-axis line
    this.ctx.strokeStyle = this.chart.axisColor;
    this.ctx.beginPath();
    this.ctx.moveTo(padding.left, height - padding.bottom);
    this.ctx.lineTo(width - padding.right, height - padding.bottom);
    this.ctx.stroke();
    
    // Draw y-axis line
    this.ctx.beginPath();
    this.ctx.moveTo(padding.left, padding.top);
    this.ctx.lineTo(padding.left, height - padding.bottom);
    this.ctx.stroke();
    
    // Calculate center point for positioning bars
    const centerX = padding.left + (chartWidth / 2);
    const totalWidth = (barWidth * 2) + barGap;
    const startX = centerX - (totalWidth / 2);
    
    // Get animated values
    const [animValue1, animValue2] = this.chart.animatedValues;
    
    // Draw first bar
    this.ctx.fillStyle = this.chart.barColors[0];
    const bar1Height = animValue1 * yScale;
    const bar1X = startX;
    const bar1Y = height - padding.bottom - bar1Height;
    this.ctx.fillRect(bar1X, bar1Y, barWidth, bar1Height);
    
    // Draw second bar
    this.ctx.fillStyle = this.chart.barColors[1];
    const bar2Height = animValue2 * yScale;
    const bar2X = startX + barWidth + barGap;
    const bar2Y = height - padding.bottom - bar2Height;
    this.ctx.fillRect(bar2X, bar2Y, barWidth, bar2Height);
    
    // Draw value above bars if they're visible
    if (bar1Height > 15) {
      this.ctx.fillStyle = '#333';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(animValue1.toFixed(0), bar1X + barWidth/2, bar1Y - 5);
    }
    
    if (bar2Height > 15) {
      this.ctx.fillStyle = '#333';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(animValue2.toFixed(0), bar2X + barWidth/2, bar2Y - 5);
    }
    
    // Draw x-axis labels - now using input signals with ()
    this.ctx.fillStyle = this.chart.textColor;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      this.firstDatasetLabel(), 
      bar1X + barWidth/2, 
      height - padding.bottom + 20
    );
    
    this.ctx.fillText(
      this.secondDatasetLabel(), 
      bar2X + barWidth/2, 
      height - padding.bottom + 20
    );
    
    // Draw x-axis label
    this.ctx.font = 'bold 12px Arial';
    this.ctx.fillText(
      this.xAxisLabel(),
      width / 2,
      height - padding.bottom / 2 + 10
    );
    
    // Draw chart title
    this.ctx.fillStyle = this.chart.textColor;
    this.ctx.font = 'bold 14px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.title(), width / 2, padding.top - 5);
  }
}

