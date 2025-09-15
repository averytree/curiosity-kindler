import "@testing-library/jest-dom";

// Mock scrollIntoView globally for all tests
window.HTMLElement.prototype.scrollIntoView = jest.fn();