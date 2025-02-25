# AUKUS Map Implementation TODO

## Spike Map Implementation
- [X] Data Processing Setup
  * Implement weight input box functionality below data input boxes
  * Create data structure to handle multiple entries per state
  * Add validation for duplicate location entries

- [X] Spike Visualization
  * Modify spike generation to handle multiple spikes per state
  * Scale spike height based on weight input
  
- [ ] State Management
  * Set up state tracking for active visualization type
  * Implement weight value persistence
  * Add error handling for invalid weight values

## Bubble Map Implementation
- [X] Base Functionality
  * Port D3 bubble map core features
  * Implement radius scaling based on weight values
  * Add support for multiple bubbles per state

- [X] Bubble Visualization
  * Create bubble placement algorithm for duplicates
  * Implement bubble size scaling
  * Add bubble overlap handling

- [X] Map Integration
  * Ensure map background remains consistent
  * Maintain existing map projection settings
  * Preserve current zoom and pan functionality

## Shared Components
- [ ] UI Controls
  * Add weight input field below existing inputs
  * Create visualization type toggle
  * Implement data validation messages

- [ ] Data Handling
  * Set up duplicate entry detection
  * Create data transformation pipeline
  * Implement weight value normalization

## Testing & Validation
- [ ] Core Functionality
  * Test weight input handling
  * Verify duplicate entry handling
  * Check visualization switching

- [ ] Visual Tests
  * Verify spike height scaling
  * Check bubble size consistency
  * Test multiple entries per state
  * Validate map projection accuracy

## Integration
- [ ] Application Integration
  * Ensure changes only affect AUKUS map component
  * Maintain existing application state management
  * Preserve other visualization options
  * Test interaction with existing features