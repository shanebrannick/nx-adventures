/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { isDevMode } from '@angular/core'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

//############################//

// Mock Angular modules before importing the handler to avoid loading Angular compiler/JIT
vi.mock('@angular/common', () => ({
  isPlatformServer: vi.fn(() => false)
}))

vi.mock('@angular/core', async (importOriginal) => {
  const actual:any = await importOriginal()
  // Partially override for tests while keeping Angular internals
  return {
    ...actual,
    isDevMode: vi.fn(() => false),
    inject: (token: any) => {
      if (token === actual.DOCUMENT) return { location: { reload: vi.fn() } }
      if (token === actual.PLATFORM_ID) return 'browser'
      // fallback to real inject if available
      return typeof actual.inject === 'function' ? actual.inject(token) : undefined
    }
  }
})


const mod = await import('./app-error-handler')
const { AppErrorHandler } = mod


//############################//

describe('AppErrorHandler', () => {

  let consoleLogSpy: any
  let consoleTraceSpy: any

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    consoleTraceSpy = vi.spyOn(console, 'trace').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  function createHandler(): any {
    // Create instance without running Angular injects by avoiding constructor
    const handler: any = Object.create(AppErrorHandler.prototype)
    // Provide a fake document with reload
    handler._doc = { location: { reload: vi.fn() } }
    handler._platformId = 'browser'
    return handler
  }

  //- - - - - - - - - - - -//

  it('reloads the page when error is a chunk load error', () => {
    ;(isDevMode as any).mockReturnValue(false)
    const handler: any = createHandler()

    const error = { name: 'ChunkLoadError', message: 'Loading chunk 1 failed' }

    handler.handleError(error)

    expect(handler._doc.location.reload).toHaveBeenCalled()
    expect(consoleLogSpy).toHaveBeenCalledWith('ShowToast', 'isChunkLoadError Something went wrong. Try refreshing!')
  })

  //- - - - - - - - - - - -//

  it('shows a toast when status code is not NOT_FOUND or UNAUTHORIZED', () => {
    ;(isDevMode as any).mockReturnValue(true)
    const handler: any = createHandler()

    const error = { statusCode: 200, message: 'A helpful error message' }

    handler.handleError(error)

    expect(consoleLogSpy).toHaveBeenCalledWith('ShowToast', 'A helpful error message')
  })

  //- - - - - - - - - - - -//

  it('calls reportError when not in dev mode', () => {
    (isDevMode as any).mockReturnValue(false)
    const handler: any = createHandler()

    const error = { statusCode: 500, message: 'Server error' }

    handler.handleError(error)

    expect(consoleLogSpy).toHaveBeenCalledWith('Error posted to server', error)
  })

  //- - - - - - - - - - - -//

  it('calls downloadErrorToTxt when in dev mode', () => {
    ;(isDevMode as any).mockReturnValue(true)
    const handler: any = createHandler()

    const error = { statusCode: 500, message: 'Dev error' }

    handler.handleError(error)

    expect(consoleLogSpy).toHaveBeenCalledWith('Downloading Text File for analysis', error)
  })
  
  //- - - - - - - - - - - -//

  it('logs error to console when in dev mode', () => {
    ;(isDevMode as any).mockReturnValue(true)
    const handler: any = createHandler()

    const error = { statusCode: 500, message: 'Dev error' }

    handler.handleError(error)

    expect(consoleLogSpy).toHaveBeenCalledWith('Logging error...', error)
    expect(consoleTraceSpy).toHaveBeenCalled()
  })

})
