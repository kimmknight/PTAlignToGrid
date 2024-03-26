# Packet Tracer Align To Grid

Cisco Packet Tracer is a great tool for learning about networking (and more).

One shortcoming with it is that when you place/move devices and shapes in the logical workspace, they are very difficult to align and so your network topologies can look unprofessional.

Packet Tracer has an option called *Align logical workspace objects* which attempts to offer some alignment as you move devices. The problem is, it doesn't work properly and often makes things worse.

Introducing **Packet Tracer Align To Grid**!

![Demo of PTAlignToGrid](aligning.gif)

## Installation

1. Download [AlignToGrid.pts](AlignToGrid.pts)

2. In Packet Tracer, click **Exensions** > **Scripting** > **Configure PT Script Modules**

3. Click the **Add...** button and locate **AlignToGrid.pts**

## Use

Once installed, you can:

- Align devices to grid by clicking **Extensions** > **Align devices to grid**
- Align shapes by clicking **Extensions** > **Align shapes to grid**
- Align notes by clicking **Extensions** > **Align notes to grid**

# Notes

- Devices align to a 100x100 grid
- Shapes align to a 50x50 grid
- Notes align to a 15x15 grid
