module.exports = {
  presets: 
    ['@babel/preset-env',
      ['@babel/preset-react', { runtime: 'automatic' }],
      ],
  plugins: ["transform-es2015-modules-commonjs"]

  
  };