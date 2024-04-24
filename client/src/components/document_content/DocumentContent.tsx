import React from 'react'

// Import utils
import { NumberUtils } from 'src/utils/number'

export default function DocumentContent() {
  const rgb = `rgb(${NumberUtils.getRandom(0, 255)}, ${NumberUtils.getRandom(0, 255)}, ${NumberUtils.getRandom(0, 255)})`;
  console.log("RGB: ", rgb);
  return (
    <section className="w-full" style={{ background: rgb }}>
      This part of document page shows the main content
    </section>
  )
}