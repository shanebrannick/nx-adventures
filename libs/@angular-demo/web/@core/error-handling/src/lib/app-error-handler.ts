/* eslint-disable @typescript-eslint/no-explicit-any */
import { isPlatformServer } from '@angular/common';
import { ErrorHandler, inject, Injectable, isDevMode, PLATFORM_ID, Provider, DOCUMENT } from '@angular/core';

//############################//

const ChunkFailedMessage = /Loading chunk .* failed/
const NOT_FOUND = '404'
const UNAUTHORIZED = '401'

//############################//

@Injectable()
export class AppErrorHandler implements ErrorHandler {

  // private _toastService = inject(SbToastService);
  // private _errorDownloadService = inject(ErrorDownloadService);
  private _doc = inject(DOCUMENT);
  private _platformId = inject(PLATFORM_ID);


  //---------------//


  handleError(error: any): void {

    if (isPlatformServer(this._platformId)) {
      console.log('SSR-Error', error)
      console.trace()
      return
    }

    //Chunk load errors are fixed by reloading
    if (this.isChunkLoadError(error)) {
      console.log('isChunkLoadError', error)
      this.showToast('isChunkLoadError Something went wrong. Try refreshing!')
      this._doc.location.reload()
      return
    }

    //Post Error
    //Don't report unauthorized errors
    const statusCode = String(error?.statusCode);
    if (statusCode !== NOT_FOUND && statusCode !== UNAUTHORIZED) {

      this.showToast(error?.message)

      //
      
      if (isDevMode()) {
        // In dev mode buffer/download the error for local analysis
        console.log('Logging error...', error);
        console.trace()
        this.downloadErrorToTxt(error);
      } else {
        //Send to server logging
        this.reportError(error);
      }
    }

  }


  //---------------//


  private isChunkLoadError(error: any): boolean {

    if (`${error.name}`?.toLowerCase().trim() === "chunkloaderror")
      return true

    return ChunkFailedMessage.test(`${error.message}`)

  }

  //---------------//


  private showToast(msg: string) {

    msg ??= 'An unknown error occurred';

    const safeMsg = msg.length > 60 ? msg.substring(0, 57) + '...' : msg
    //Some toasting service
    console.log('ShowToast', safeMsg)
  }

  //---------------//


  private reportError(error: any) {

    console.log('Error posted to server', error);
  }

  //---------------//


  private downloadErrorToTxt(error: any) {

    console.log('Downloading Text File for analysis', error);
  }

} //Cls



//############################//


export function provideAppErrorHandler(): Provider {
  return {
    provide: ErrorHandler,
    useClass: AppErrorHandler,
  }
}


//############################//