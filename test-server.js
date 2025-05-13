#!/usr/bin/env node

/**
 * Simple test server that simulates MCP request/response
 * This is useful for testing the MCP without integrating with a client
 */
import readline from 'readline';
import { spawn } from 'child_process';

// Create interface for reading from terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Start the MCP server
console.log('Starting Strapi CMS MCP server...');
const mcpProcess = spawn('node', ['build/index.js'], {
  stdio: ['pipe', 'pipe', process.stderr]
});

mcpProcess.stdout.on('data', (data) => {
  try {
    const response = JSON.parse(data.toString());
    console.log('\nMCP Response:');
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error parsing MCP response:', error);
    console.log('Raw response:', data.toString());
  }
  promptForCommand();
});

mcpProcess.on('error', (error) => {
  console.error('MCP process error:', error);
});

mcpProcess.on('close', (code) => {
  console.log(`MCP process exited with code ${code}`);
  rl.close();
  process.exit(0);
});

// Examples of commands
const examples = {
  'list_tools': {
    jsonrpc: '2.0',
    method: 'listTools',
    params: {},
    id: 1,
  },
  'get_restaurants': {
    jsonrpc: '2.0',
    method: 'callTool',
    params: {
      name: 'get_documents',
      arguments: {
        contentType: 'restaurants',
        populate: '*'
      }
    },
    id: 2,
  },
  'get_homepage': {
    jsonrpc: '2.0',
    method: 'callTool',
    params: {
      name: 'get_single_type',
      arguments: {
        contentType: 'homepage',
        populate: '*'
      }
    },
    id: 3,
  }
};

function promptForCommand() {
  rl.question('\nEnter command (list_tools, get_restaurants, get_homepage, or custom JSON): ', (answer) => {
    if (answer === 'exit') {
      mcpProcess.kill();
      rl.close();
      return;
    }

    let request;
    if (examples[answer]) {
      request = examples[answer];
    } else {
      try {
        request = JSON.parse(answer);
      } catch (error) {
        console.error('Invalid JSON. Using list_tools command.');
        request = examples.list_tools;
      }
    }

    console.log('\nSending request:');
    console.log(JSON.stringify(request, null, 2));
    mcpProcess.stdin.write(JSON.stringify(request) + '\n');
  });
}

// Start the REPL
console.log('MCP Test Server');
console.log('Type "list_tools", "get_restaurants", "get_homepage", or a custom JSON request.');
console.log('Type "exit" to quit.');
promptForCommand(); 