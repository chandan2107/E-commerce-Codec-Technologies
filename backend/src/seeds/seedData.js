const seedCategories = [
  // Level 1: Roots
  {
    name: 'Electronics',
    slug: 'electronics',
    description: 'High-performance audio, computing, and professional camera equipment',
    displayOrder: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    icon: 'Cpu'
  },
  {
    name: 'Home & Workspace',
    slug: 'home-workspace',
    description: 'Ergonomic precision furniture and minimalist desk accessories designed for deep work',
    displayOrder: 2,
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    icon: 'Armchair'
  },
  {
    name: 'Lifestyle & Everyday',
    slug: 'lifestyle-everyday',
    description: 'Timeless watches, technical carry bags, and daily design essentials',
    displayOrder: 3,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    icon: 'Watch'
  },

  // Level 2: Subcategories (Parent will be resolved during seed)
  {
    name: 'Audio & Headphones',
    slug: 'audio-headphones',
    parentSlug: 'electronics',
    description: 'Audiophile headphones, noise-cancelling monitors, and high-fidelity wireless audio',
    displayOrder: 1,
    icon: 'Headphones'
  },
  {
    name: 'Keyboards & Peripherals',
    slug: 'keyboards-peripherals',
    parentSlug: 'electronics',
    description: 'Custom mechanical keyboards, precision mice, and artisan desk gear',
    displayOrder: 2,
    icon: 'Keyboard'
  },
  {
    name: 'Cameras & Imaging',
    slug: 'cameras-imaging',
    parentSlug: 'electronics',
    description: 'Rangefinder cameras, prime lenses, and mirrorless photography gear',
    displayOrder: 3,
    icon: 'Camera'
  },
  {
    name: 'Ergonomic Seating',
    slug: 'ergonomic-seating',
    parentSlug: 'home-workspace',
    description: 'Engineered posture chairs built for prolonged focus and lumbar support',
    displayOrder: 1,
    icon: 'Armchair'
  },
  {
    name: 'Desk Organizers & Lamps',
    slug: 'desk-organizers',
    parentSlug: 'home-workspace',
    description: 'Solid walnut monitor risers, brass lamps, and magnetic cable organizers',
    displayOrder: 2,
    icon: 'Lamp'
  },
  {
    name: 'Horology & Watches',
    slug: 'horology-watches',
    parentSlug: 'lifestyle-everyday',
    description: 'Automatic mechanical movements, Bauhaus dials, and sapphire crystal timepieces',
    displayOrder: 1,
    icon: 'Watch'
  },
  {
    name: 'Technical Carry & Bags',
    slug: 'technical-carry',
    parentSlug: 'lifestyle-everyday',
    description: 'Weatherproof cordura backpacks, slings, and modular EDC luggage',
    displayOrder: 2,
    icon: 'Briefcase'
  }
];

const seedProducts = [
  // 1. Audio
  {
    name: 'Sony WH-1000XM5 Wireless Noise-Canceling',
    slug: 'sony-wh-1000xm5-wireless-noise-canceling',
    sku: 'SNY-WH1000XM5-BLK',
    brand: 'Sony',
    categorySlug: 'audio-headphones',
    shortDescription: 'Industry-leading noise cancelation with two processors and 8 microphones.',
    description: 'The WH-1000XM5 headphones rewrite the rules for distraction-free listening. Two processors control 8 microphones for unprecedented noise cancelation and exceptional call quality. With an Auto NC Optimizer, noise cancelation is automatically optimized based on your wearing conditions and environment.',
    price: 398,
    compareAtPrice: 449,
    inventory: { stockQuantity: 42, isAvailable: true },
    ratings: { average: 4.8, count: 184 },
    tags: ['wireless', 'noise-canceling', 'bluetooth', 'audio', 'over-ear'],
    specifications: [
      { name: 'Battery Life', value: 'Up to 30 hours' },
      { name: 'Driver Unit', value: '30mm Carbon Fiber' },
      { name: 'Weight', value: '250g' },
      { name: 'Connectivity', value: 'Bluetooth 5.2 / 3.5mm' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80', alt: 'Sony WH-1000XM5 on sleek stand', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80', alt: 'Headphones detail view', isPrimary: false }
    ],
    featured: true
  },
  {
    name: 'Sennheiser HD 660S2 Open-Back Audiophile',
    slug: 'sennheiser-hd-660s2-open-back',
    sku: 'SNH-HD660S2-GRY',
    brand: 'Sennheiser',
    categorySlug: 'audio-headphones',
    shortDescription: 'Open-back dynamic stereo headphones for pristine acoustic resolution.',
    description: 'Experience acoustic excellence with refined transducer airflow and lightweight aluminum voice coils delivering sub-bass depth, transparent imaging, and micro-detail resolution tuned specifically for critical listening.',
    price: 599,
    compareAtPrice: 699,
    inventory: { stockQuantity: 18, isAvailable: true },
    ratings: { average: 4.9, count: 86 },
    tags: ['audiophile', 'open-back', 'wired', 'studio', 'hi-res'],
    specifications: [
      { name: 'Impedance', value: '300 ohms' },
      { name: 'Frequency Response', value: '8 Hz - 41,500 Hz' },
      { name: 'Transducer Principle', value: 'Dynamic, Open' },
      { name: 'Connector', value: '6.35 mm / 4.4 mm Pentaconn' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80', alt: 'Sennheiser HD 660S2 in studio', isPrimary: true }
    ],
    featured: false
  },
  {
    name: 'Apple AirPods Max - Space Gray',
    slug: 'apple-airpods-max-space-gray',
    sku: 'APL-AIRPODS-MAX-GRY',
    brand: 'Apple',
    categorySlug: 'audio-headphones',
    shortDescription: 'High-fidelity audio with active noise cancellation and spatial audio.',
    description: 'Apple-designed dynamic driver provides high-fidelity audio. Computational audio combines custom acoustic design with the Apple H1 chip and software for breakthrough listening experiences with personalized spatial audio.',
    price: 549,
    compareAtPrice: null,
    inventory: { stockQuantity: 28, isAvailable: true },
    ratings: { average: 4.7, count: 312 },
    tags: ['wireless', 'noise-canceling', 'apple', 'spatial-audio', 'aluminum'],
    specifications: [
      { name: 'Chip', value: 'Dual Apple H1 Headphone Chip' },
      { name: 'Battery Life', value: '20 hours with ANC enabled' },
      { name: 'Weight', value: '384.8g' },
      { name: 'Canopy', value: 'Breathable knit mesh' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80', alt: 'Apple AirPods Max Front', isPrimary: true }
    ],
    featured: true
  },
  {
    name: 'Bose QuietComfort Ultra Headphones',
    slug: 'bose-quietcomfort-ultra-headphones',
    sku: 'BOS-QCU-WHT',
    brand: 'Bose',
    categorySlug: 'audio-headphones',
    shortDescription: 'World-class noise cancellation with spatialized audio and CustomTune.',
    description: 'Step into spatial listening with Bose Immersive Audio that takes what you’re hearing out of your head and places it in front of you. CustomTune technology personalizes the noise cancellation and sound performance to your ears.',
    price: 429,
    compareAtPrice: 479,
    inventory: { stockQuantity: 34, isAvailable: true },
    ratings: { average: 4.6, count: 95 },
    tags: ['noise-canceling', 'bose', 'wireless', 'comfortable'],
    specifications: [
      { name: 'Battery', value: 'Up to 24 hours' },
      { name: 'Modes', value: 'Quiet, Aware, Immersion' },
      { name: 'Bluetooth', value: '5.3 with multipoint' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1000&q=80', alt: 'Bose QuietComfort Ultra', isPrimary: true }
    ],
    featured: false
  },

  // 2. Keyboards & Peripherals
  {
    name: 'Keychron Q1 Pro Custom Wireless Mechanical Keyboard',
    slug: 'keychron-q1-pro-wireless-custom-keyboard',
    sku: 'KYC-Q1PRO-GATERON-RED',
    brand: 'Keychron',
    categorySlug: 'keyboards-peripherals',
    shortDescription: 'Full CNC aluminum body, QMK/VIA programmable, gasket mount.',
    description: 'A refined 75% mechanical keyboard crafted with a full CNC machined 6063 aluminum body, double-gasket design, screw-in PCB stabilizers, hot-swappable sockets, and Bluetooth 5.1 wireless connectivity.',
    price: 199,
    compareAtPrice: 220,
    inventory: { stockQuantity: 65, isAvailable: true },
    ratings: { average: 4.9, count: 142 },
    tags: ['keyboard', 'mechanical', 'custom', 'aluminum', 'bluetooth', 'qmk'],
    specifications: [
      { name: 'Layout', value: '75% Exploded' },
      { name: 'Switches', value: 'K Pro Red Linear (Lubed)' },
      { name: 'Polling Rate', value: '1000 Hz (Type-C) / 90 Hz (BT)' },
      { name: 'Body Material', value: 'CNC Machined Aluminum' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80', alt: 'Keychron Q1 mechanical keyboard', isPrimary: true }
    ],
    featured: true
  },
  {
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    slug: 'logitech-mx-master-3s-mouse',
    sku: 'LOG-MXM3S-GRY',
    brand: 'Logitech',
    categorySlug: 'keyboards-peripherals',
    shortDescription: '8K DPI optical sensor with Quiet Clicks and MagSpeed electromagnetic scroll.',
    description: 'An icon remastered. Feel every moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Clicks and an 8,000 DPI track-on-glass sensor.',
    price: 99,
    compareAtPrice: 119,
    inventory: { stockQuantity: 110, isAvailable: true },
    ratings: { average: 4.8, count: 520 },
    tags: ['mouse', 'ergonomic', 'wireless', 'productivity', 'bluetooth'],
    specifications: [
      { name: 'Sensor', value: 'Darkfield 8000 DPI' },
      { name: 'Battery', value: 'Up to 70 days per charge' },
      { name: 'Connectivity', value: 'Bluetooth Low Energy & Logi Bolt' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80', alt: 'Logitech MX Master mouse', isPrimary: true }
    ],
    featured: false
  },
  {
    name: 'Mode Sonnet 75% Artisan Mechanical Keyboard',
    slug: 'mode-sonnet-artisan-keyboard',
    sku: 'MOD-SNNT-BRSS',
    brand: 'Mode Designs',
    categorySlug: 'keyboards-peripherals',
    shortDescription: 'Bespoke keyboard with internal brass weight and multi-material accent accents.',
    description: 'Designed for discerning typists. The Sonnet balances acoustic presence and structural elegance. Featuring isolated mount blocks, customizable copper base accents, and fine chamfered edges.',
    price: 349,
    compareAtPrice: 380,
    inventory: { stockQuantity: 8, isAvailable: true },
    ratings: { average: 5.0, count: 34 },
    tags: ['artisan', 'mechanical', 'custom', 'brass', 'luxury'],
    specifications: [
      { name: 'Mounting Style', value: 'Stack Mount / Isolated Top Mount' },
      { name: 'Plate Material', value: 'FR4 / Solid Brass' },
      { name: 'Weight', value: '2.1 kg assembled' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80', alt: 'Custom artisan mechanical keyboard', isPrimary: true }
    ],
    featured: true
  },

  // 3. Cameras & Imaging
  {
    name: 'Fujifilm X-T5 Mirrorless Digital Camera',
    slug: 'fujifilm-x-t5-mirrorless-camera',
    sku: 'FJI-XT5-SLV',
    brand: 'Fujifilm',
    categorySlug: 'cameras-imaging',
    shortDescription: '40.2MP X-Trans CMOS 5 HR sensor with 5-axis in-body image stabilization.',
    description: 'Classic dial operation meets fifth-generation imaging technology. Powered by the 40.2MP sensor and X-Processor 5, the X-T5 delivers high-resolution stills, 6.2K/30p video, and legendary Film Simulation modes in a compact, weather-sealed body.',
    price: 1699,
    compareAtPrice: 1799,
    inventory: { stockQuantity: 12, isAvailable: true },
    ratings: { average: 4.9, count: 78 },
    tags: ['camera', 'mirrorless', 'photography', 'fujifilm', 'retro', '4k'],
    specifications: [
      { name: 'Sensor', value: '40.2MP APS-C X-Trans CMOS 5 HR' },
      { name: 'Stabilization', value: '7-stop 5-axis IBIS' },
      { name: 'Viewfinder', value: '3.69M-dot OLED EVF' },
      { name: 'Weight', value: '557g (body only)' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80', alt: 'Fujifilm X-T5 Classic Mirrorless', isPrimary: true }
    ],
    featured: true
  },
  {
    name: 'Leica Q3 Full-Frame Compact Camera',
    slug: 'leica-q3-full-frame-camera',
    sku: 'LCA-Q3-BLK',
    brand: 'Leica',
    categorySlug: 'cameras-imaging',
    shortDescription: '60MP BSI CMOS full-frame sensor with fixed Summilux 28mm f/1.7 ASPH lens.',
    description: 'The third generation of the legendary Leica Q family. Seamlessly combining iconic German craftsmanship with Triple-Resolution Technology, tilting high-definition touch display, and 8K cinematic recording.',
    price: 5995,
    compareAtPrice: null,
    inventory: { stockQuantity: 3, isAvailable: true },
    ratings: { average: 5.0, count: 21 },
    tags: ['leica', 'luxury', 'full-frame', 'photography', 'compact'],
    specifications: [
      { name: 'Lens', value: 'Leica Summilux 28mm f/1.7 ASPH' },
      { name: 'Sensor', value: '60.3MP Full-Frame BSI CMOS' },
      { name: 'ISO Range', value: '50 - 100,000' },
      { name: 'Protection', value: 'IP52 Weather-Sealing' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80', alt: 'Leica Q3 Camera', isPrimary: true }
    ],
    featured: true
  },
  {
    name: 'Sony Alpha 7 IV Full-Frame Mirrorless',
    slug: 'sony-alpha-7-iv-mirrorless-camera',
    sku: 'SNY-A7IV-BODY',
    brand: 'Sony',
    categorySlug: 'cameras-imaging',
    shortDescription: '33MP Exmor R CMOS sensor with BIONZ XR processing and Real-time Eye AF.',
    description: 'The all-around standard for modern creators. Offers breathtaking 33MP still quality, 4K 60p 10-bit 4:2:2 video capture, cutting-edge AI autofocus tracking, and class-leading dynamic range.',
    price: 2498,
    compareAtPrice: 2699,
    inventory: { stockQuantity: 15, isAvailable: true },
    ratings: { average: 4.8, count: 167 },
    tags: ['sony', 'mirrorless', 'full-frame', 'video', 'hybrid'],
    specifications: [
      { name: 'Sensor', value: '33MP Full-Frame Exmor R' },
      { name: 'Autofocus', value: '759 phase-detection points' },
      { name: 'Video', value: '4K 60p in Super35, 4K 30p 7K oversampled' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80', alt: 'Sony A7 IV Camera', isPrimary: true }
    ],
    featured: false
  },

  // 4. Ergonomic Seating & Workspace
  {
    name: 'Herman Miller Aeron Ergonomic Task Chair',
    slug: 'herman-miller-aeron-chair',
    sku: 'HM-AERON-SIZE-B-MINERAL',
    brand: 'Herman Miller',
    categorySlug: 'ergonomic-seating',
    shortDescription: 'Ergonomic icon with 8Z Pellicle suspension and PostureFit SL spinal support.',
    description: 'The pinnacle of ergonomic seating design. Aeron balances body weight naturally through eight zones of varied tension across the seat and back, providing ventilation and continuous sacral support for optimal posture all day.',
    price: 1495,
    compareAtPrice: 1680,
    inventory: { stockQuantity: 24, isAvailable: true },
    ratings: { average: 4.9, count: 410 },
    tags: ['ergonomic', 'chair', 'workspace', 'herman-miller', 'office'],
    specifications: [
      { name: 'Mechanism', value: 'Harmonic 2 Tilt with Forward Angle' },
      { name: 'Material', value: 'Recycled Ocean-Bound Plastic & Aluminum' },
      { name: 'Warranty', value: '12-Year 3-Shift Manufacturer Warranty' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1580481077195-c3a9a3221101?auto=format&fit=crop&w=1000&q=80', alt: 'Herman Miller Aeron Chair', isPrimary: true }
    ],
    featured: true
  },
  {
    name: 'Steelcase Gesture Executive Desk Chair',
    slug: 'steelcase-gesture-chair',
    sku: 'STC-GESTURE-GRAPHITE',
    brand: 'Steelcase',
    categorySlug: 'ergonomic-seating',
    shortDescription: 'Designed for posture transitions between smartphones, tablets, and monitors.',
    description: 'Inspired by the movement of the human body and tested against thousands of postural variations. Features 360-degree rotating arms and 3D LiveBack contouring that moves with your spine throughout the workday.',
    price: 1380,
    compareAtPrice: 1520,
    inventory: { stockQuantity: 19, isAvailable: true },
    ratings: { average: 4.8, count: 189 },
    tags: ['ergonomic', 'steelcase', 'chair', 'posture', 'workspace'],
    specifications: [
      { name: 'Arm Adjustment', value: '360-degree full range mobility' },
      { name: 'Core Equalizer', value: 'Auto-adjusting lumbar support' },
      { name: 'Max Weight Capacity', value: '400 lbs' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1000&q=80', alt: 'Modern ergonomic office chair', isPrimary: true }
    ],
    featured: false
  },

  // 5. Desk Organizers & Accessories
  {
    name: 'Grovemade Solid Walnut Dual Monitor Riser',
    slug: 'grovemade-solid-walnut-dual-monitor-stand',
    sku: 'GRV-DSKR-WALNUT',
    brand: 'Grovemade',
    categorySlug: 'desk-organizers',
    shortDescription: 'American black walnut shelf with vegetable tanned leather pad and aluminum shelf.',
    description: 'Elevate your screens to ergonomic eye height while reclaiming valuable desk territory below. Crafted from thick 15-ply domestic walnut hardwood and precision-curved 5052 aluminum with natural cork base pads.',
    price: 260,
    compareAtPrice: 290,
    inventory: { stockQuantity: 45, isAvailable: true },
    ratings: { average: 4.9, count: 112 },
    tags: ['desk-shelf', 'walnut', 'wood', 'workspace', 'minimalist'],
    specifications: [
      { name: 'Dimensions', value: '46" L x 9" W x 4.2" H' },
      { name: 'Weight Capacity', value: 'Up to 100 lbs' },
      { name: 'Timber Origin', value: 'Eastern United States Black Walnut' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80', alt: 'Grovemade wooden desk shelf setup', isPrimary: true }
    ],
    featured: false
  },
  {
    name: 'BenQ ScreenBar Pro LED Monitor Light',
    slug: 'benq-screenbar-pro-monitor-light',
    sku: 'BNQ-SCRN-PRO',
    brand: 'BenQ',
    categorySlug: 'desk-organizers',
    shortDescription: 'Zero-reflection auto-dimming monitor lamp with presence detection.',
    description: 'Specially engineered asymmetrical optical design shines light onto your desk without reflecting off the monitor panel. Includes ultrasonic motion sensor for automatic power on/off and real-time illuminance auto-dimming.',
    price: 139,
    compareAtPrice: 159,
    inventory: { stockQuantity: 58, isAvailable: true },
    ratings: { average: 4.7, count: 245 },
    tags: ['lighting', 'lamp', 'workspace', 'productivity'],
    specifications: [
      { name: 'Illuminance', value: '1000 Lux @ center' },
      { name: 'Color Temperature', value: '2700K - 6500K' },
      { name: 'Power Consumption', value: '8.5W max USB-C' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80', alt: 'Minimal desk lamp setup', isPrimary: true }
    ],
    featured: false
  },

  // 6. Horology & Watches
  {
    name: 'Nomos Glashütte Tangente 38 Bauhaus Mechanical Watch',
    slug: 'nomos-glashutte-tangente-38-watch',
    sku: 'NOM-TANG-164',
    brand: 'Nomos Glashütte',
    categorySlug: 'horology-watches',
    shortDescription: 'In-house manual winding caliber Alpha with sapphire crystal case back.',
    description: 'The archetype of the Glashütte mechanical watch. Clear typography, tempered blue steel hands, galvanized white silver-plated dial, and the handcrafted in-house Alpha caliber movement visible through the sapphire glass back.',
    price: 2180,
    compareAtPrice: 2350,
    inventory: { stockQuantity: 6, isAvailable: true },
    ratings: { average: 5.0, count: 48 },
    tags: ['watch', 'horology', 'mechanical', 'bauhaus', 'german', 'luxury'],
    specifications: [
      { name: 'Diameter', value: '37.5 mm' },
      { name: 'Height', value: '6.8 mm ultra-thin' },
      { name: 'Movement', value: 'In-house Alpha manual wind (43h reserve)' },
      { name: 'Strap', value: 'Horween Genuine Shell Cordovan' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80', alt: 'Nomos Minimalist Watch dial', isPrimary: true }
    ],
    featured: true
  },
  {
    name: 'Seiko Prospex Alpinist Automatic Field Watch',
    slug: 'seiko-prospex-alpinist-automatic',
    sku: 'SEI-SPB121J1-GRN',
    brand: 'Seiko',
    categorySlug: 'horology-watches',
    shortDescription: 'Sunburst forest green dial, internal rotating compass ring, 70-hour reserve.',
    description: 'A legendary outdoor adventurer timepiece updated with the 6R35 automatic caliber. Featuring 200m water resistance, cyclops date magnifier over sapphire crystal, and golden cathedral hands against an emerald dial.',
    price: 725,
    compareAtPrice: 775,
    inventory: { stockQuantity: 22, isAvailable: true },
    ratings: { average: 4.8, count: 133 },
    tags: ['watch', 'seiko', 'automatic', 'field-watch', 'green'],
    specifications: [
      { name: 'Caliber', value: 'Seiko 6R35 Automatic (70 Hours)' },
      { name: 'Water Resistance', value: '20 bar / 200 meters' },
      { name: 'Crystal', value: 'Curved sapphire with anti-reflective coating' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80', alt: 'Seiko automatic watch close up', isPrimary: true }
    ],
    featured: false
  },

  // 7. Technical Carry & Bags
  {
    name: 'Peak Design Everyday Backpack 20L v2',
    slug: 'peak-design-everyday-backpack-20l',
    sku: 'PKD-EDB-20-CHAR',
    brand: 'Peak Design',
    categorySlug: 'technical-carry',
    shortDescription: 'Award-winning weatherproof pack with FlexFold internal dividers and MagLatch.',
    description: 'An iconic pack built around access, organization, expansion, and protection. Features 100% recycled 400D weatherproof nylon canvas shell with high-density foam padding and dual side access weatherproof zippers.',
    price: 279,
    compareAtPrice: 299,
    inventory: { stockQuantity: 38, isAvailable: true },
    ratings: { average: 4.9, count: 280 },
    tags: ['backpack', 'camera-bag', 'peak-design', 'travel', 'weatherproof'],
    specifications: [
      { name: 'Capacity', value: '17L min, 20L max expanded' },
      { name: 'Laptop Carry', value: 'Up to 16" MacBook Pro' },
      { name: 'Dividers', value: '3x FlexFold origami dividers included' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80', alt: 'Everyday backpack front view', isPrimary: true }
    ],
    featured: true
  },
  {
    name: 'Bellroy Transit Workpack 20L - Marine Blue',
    slug: 'bellroy-transit-workpack-20l',
    sku: 'BEL-TRN-WKP-BLU',
    brand: 'Bellroy',
    categorySlug: 'technical-carry',
    shortDescription: 'Streamlined commuter pack with separate laptop harness and hidden soft pockets.',
    description: 'Clean aesthetic outside, thoughtful organization inside. Designed with durable water-resistant woven fabric made from recycled plastic bottles, lumbar back panel support, and quick-access sunglass pocket.',
    price: 199,
    compareAtPrice: null,
    inventory: { stockQuantity: 26, isAvailable: true },
    ratings: { average: 4.7, count: 118 },
    tags: ['backpack', 'bellroy', 'edc', 'commute', 'minimalist'],
    specifications: [
      { name: 'Dimensions', value: '500 x 320 x 180 mm' },
      { name: 'Material', value: 'Recycled Dura Nylon 6.6' },
      { name: 'Weight', value: '850g' }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80', alt: 'Bellroy commuter backpack', isPrimary: true }
    ],
    featured: false
  }
];

module.exports = {
  seedCategories,
  seedProducts
};

