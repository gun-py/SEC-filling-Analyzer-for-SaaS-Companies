import styRec from '../styles/Rec.module.css'
import React from 'react';
import Link from 'next/link';

export default function Recommendations() {
    return (
        <div className={styRec.suggestion}>
            <Link href='/'>
            <a href="www.google.com" className={styRec.linktag}>
              <p className={styRec.linkPart}>www.google.com/asd/asda/asd</p>
              <p className={styRec.topic}>Hi definition and meaning | Collins English Dictionary</p>
              </a>
            </Link>
          <div>
            <p className={styRec.contextPart}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repudiandae debitis, eveniet sequi quia harum. Dolor commodi, adipisci culpa non perferendis excepturi distinctio consectetur, ipsa eos dignissimos aspernatur voluptates explicabo?</p>
          </div>
        </div>
  )
}
