class MyEmitter extends EventEmitter {
    triggerEvent(name) {
      console.log('Triggering event...');
      this.emit('greet', name);
    }
  }
  
  const customEmitter = new MyEmitter();
  
  customEmitter.on('greet', (name) => {
    console.log(`Greeting received for: ${name}`);
  });
  
  customEmitter.triggerEvent('Eve'); // Output: Triggering event...
                                     //         Greeting received for: Eve
  