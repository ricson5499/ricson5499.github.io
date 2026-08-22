# Windows Development Environment: BlueStacks + WSL2 + Docker Coexistence

## Purpose

This document records the verified Windows development configuration that allows:

* BlueStacks Android Emulator
* WSL2
* Docker Desktop
* Linux containers
* Existing `make deploy` / `make update` workflows

to run **at the same time** on Windows 11.

This is especially important for developers who need to run Android games/apps in BlueStacks while continuing normal Docker/WSL development and deployment work.

---

## 1. Verified Architecture

The supported architecture is:

```text
Windows 11
│
├── BlueStacks 5
│     └── Android Emulator
│
├── WSL 2
│     └── Linux distribution
│
│          └── Docker Desktop / Docker Engine
│
└── Windows applications
      ├── VS Code
      ├── Node.js
      ├── .NET
      └── AWS CLI
```

The important point is that BlueStacks and WSL2 do **not** need to take exclusive control of CPU virtualization.

They can use the Windows virtualization stack together.

---

# 2. Key Compatibility Versions

## BlueStacks

### Minimum important version

**BlueStacks 5.20+**

Do not document this as `5.2`.

The relevant compatibility milestone is **5.20**, which introduced support for running BlueStacks with Hyper-V enabled.

For new developer machines:

> Always install the latest BlueStacks 5 release unless a project specifically requires another version.

BlueStacks officially supports Hyper-V-enabled Windows configurations. This is the key difference from many older Android-emulator configurations.

---

## Windows

Recommended:

**Windows 11**

Supported configurations depend on the Windows release and edition, but for a new development machine Windows 11 should be preferred over legacy Windows 10 installations.

Windows 11 is particularly recommended for this setup because the current WSL, Hyper-V, virtualization, Docker and emulator ecosystem is being actively maintained around Windows 11.

---

## WSL

### Minimum for current Docker Desktop

**WSL 2.1.5 or newer**

Recommended:

**Latest WSL version**

Check:

```powershell
wsl --version
```

Update:

```powershell
wsl --update
```

Docker currently recommends keeping WSL up to date. WSL 2.1.5 is the minimum documented requirement for Docker Desktop's WSL 2 backend.

If Enhanced Container Isolation is required, WSL **2.6+** is required.

---

## Docker Desktop

Use a current Docker Desktop release.

Recommended backend:

```text
WSL 2
```

Docker Desktop currently supports:

* WSL 2
* Hyper-V
* Docker VMM (Beta)

For this development configuration, **WSL 2 backend is the default/recommended choice** unless there is a specific reason to use another backend.

---

# 3. Required Windows Features

The following virtualization-related components should remain enabled.

## Required

```text
Virtual Machine Platform
Windows Subsystem for Linux
Windows Hypervisor Platform
```

Depending on the Docker configuration and Windows edition, Hyper-V components may also be enabled.

For systems using Hyper-V explicitly:

```text
Hyper-V
  ├── Hyper-V Platform
  └── Hyper-V Management Tools
```

Hardware virtualization must also be enabled in BIOS/UEFI:

```text
AMD-V
```

or:

```text
Intel VT-x
```

Microsoft documents Hyper-V as requiring hardware-assisted virtualization and SLAT.

---

# 4. Recommended Windows Feature Configuration

Open:

```text
Win + R
optionalfeatures
```

Verify that the relevant features are enabled.

Typical configuration:

```text
[x] Virtual Machine Platform
[x] Windows Hypervisor Platform
[x] Windows Subsystem for Linux
[x] Hyper-V
```

The exact Hyper-V entries available depend on the Windows edition.

**Do not disable these features just because BlueStacks is installed.**

Modern BlueStacks versions are designed to work with Hyper-V enabled.

---

# 5. Why Older Configurations Had Problems

Older Android emulators often attempted to use hardware virtualization in a way that conflicted with Hyper-V.

Typical old configuration:

```text
Windows 10
│
├── WSL2
│
├── Docker
│
└── Old Android Emulator
       │
       └── Direct VT-x / AMD-V usage
```

This could result in:

* Emulator refusing to start
* WSL2 becoming unavailable
* Docker failing to start
* Emulator performance degradation
* Requirement to disable Hyper-V
* Requirement to disable Virtual Machine Platform
* Rebooting Windows every time the development/gaming workload changed

This is why older setups commonly required:

```text
Development:
    WSL2 + Docker ON
    Emulator OFF

Gaming:
    WSL2 + Hyper-V OFF
    Emulator ON
```

This configuration should **not** be used with current BlueStacks 5.20+ unless troubleshooting a specific compatibility problem.

---

# 6. Current Architecture

Modern Windows virtualization works more like:

```text
                 Windows Hypervisor
                       │
          ┌────────────┴────────────┐
          │                         │
        WSL2                    BlueStacks
          │                         │
       Docker                    Android
          │
       Linux containers
```

The important difference is that WSL2 and BlueStacks can share the Windows virtualization infrastructure instead of requiring exclusive access to hardware virtualization.

Microsoft describes WSL2 as using a subset of the Hyper-V architecture through the Virtual Machine Platform component.

---

# 7. Docker Configuration

Docker Desktop should use the WSL 2 backend.

Check:

```text
Docker Desktop
    → Settings
        → General
            → Use the WSL 2 based engine
```

Then verify WSL integration:

```text
Docker Desktop
    → Settings
        → Resources
            → WSL Integration
```

Enable the required Linux distribution.

Test:

```powershell
wsl -l -v
```

Expected example:

```text
NAME            STATE           VERSION
Ubuntu          Running         2
```

Then:

```powershell
docker version
docker info
docker ps
```

All should work without disabling BlueStacks.

Docker officially documents WSL2 as its default Windows backend and recommends keeping WSL updated.

---

# 8. BlueStacks Verification

After installing BlueStacks:

1. Start BlueStacks.
2. Start an Android instance.
3. Launch a normal Android application/game.
4. Leave BlueStacks running.
5. Open PowerShell.
6. Start WSL.
7. Start Docker.
8. Run a Docker container.

Example:

```powershell
wsl
```

Then:

```bash
docker ps
```

The expected result is:

```text
BlueStacks       RUNNING
WSL2             RUNNING
Docker           RUNNING
```

No reboot should be required when switching between the two workloads.

---

# 9. Deployment Verification

For projects using:

```bash
make deploy
make update
```

the workflow should remain unchanged.

Example:

```text
BlueStacks running
        │
        ├── WSL2 running
        │
        └── Docker running
                │
                └── make deploy
                        │
                        ├── docker build
                        ├── docker tag
                        ├── docker push
                        └── ECS deployment
```

The Android emulator does not need to be closed before Docker deployment.

---

# 10. Quick Health Check

Run the following before reporting a compatibility problem.

### Windows

```powershell
winver
```

### WSL

```powershell
wsl --version
wsl -l -v
```

Expected:

```text
VERSION
2
```

### Docker

```powershell
docker version
docker info
docker ps
```

### Hypervisor

```powershell
systeminfo
```

If virtualization is functioning, the Hyper-V section should indicate that a hypervisor has been detected.

Example:

```text
A hypervisor has been detected.
Features required for Hyper-V will not be displayed.
```

Microsoft documents this as a valid indication that the Windows hypervisor is active.

---

# 11. Important: Do Not Disable Hypervisor at Boot

Some older troubleshooting guides recommend:

```powershell
bcdedit /set hypervisorlaunchtype off
```

**Do not use this as a normal configuration.**

Doing so can break:

* WSL2
* Docker Desktop
* Hyper-V
* other virtualization-dependent applications

If the hypervisor was previously disabled, restore it with:

```powershell
bcdedit /set hypervisorlaunchtype auto
```

Then reboot.

Docker's current troubleshooting documentation specifically identifies the Windows hypervisor not launching at boot as a cause of WSL2/Docker failures.

---

# 12. Troubleshooting

## BlueStacks does not start

Check:

```text
BlueStacks version >= 5.20
```

Then verify:

```text
Virtual Machine Platform
Windows Hypervisor Platform
```

are enabled.

Update BlueStacks before changing Windows virtualization settings.

---

## Docker does not start

Check:

```powershell
wsl --version
wsl -l -v
```

Then:

```powershell
wsl --update
```

Restart Docker Desktop.

If necessary:

```powershell
wsl --shutdown
```

Then restart Docker Desktop.

Do **not** immediately disable Hyper-V.

---

## WSL suddenly stops working after installing an emulator

Check:

```powershell
bcdedit /enum {current}
```

Look for:

```text
hypervisorlaunchtype
```

It should normally be:

```text
Auto
```

If required:

```powershell
bcdedit /set hypervisorlaunchtype auto
```

Then reboot.

---

# 13. Performance Considerations

Coexistence does not mean unlimited performance.

The following workloads can compete for resources:

```text
BlueStacks
    +
WSL2
    +
Docker build
    +
VS Code
    +
Chrome
```

Possible symptoms:

* Higher RAM usage
* CPU spikes
* Disk I/O contention
* Android emulator frame-rate drops
* Slower Docker image builds

This is a **resource contention problem**, not necessarily a virtualization compatibility problem.

WSL2 uses dynamic memory allocation, and Docker recommends WSL memory-management features such as `autoMemoryReclaim` where appropriate.

---

# 14. Recommended Developer Policy

For modern developer machines:

```text
Windows 11
    +
Latest WSL2
    +
Latest Docker Desktop
    +
BlueStacks 5.20+
```

Keep virtualization enabled permanently.

### Do NOT use this workflow:

```text
Start development
→ Disable Hyper-V
→ Reboot
→ Start Docker

Start gaming
→ Disable WSL/Hyper-V
→ Reboot
→ Start emulator
```

### Use this instead:

```text
Windows starts
      │
      ├── WSL2
      ├── Docker
      └── BlueStacks
```

Both environments can remain available simultaneously.

---

# 15. Known Compatibility Baseline

| Component                   | Minimum / Baseline                                           | Recommended                 |
| --------------------------- | ------------------------------------------------------------ | --------------------------- |
| Windows                     | Windows 10/11 with virtualization support                    | **Windows 11**              |
| BlueStacks                  | **5.20+**                                                    | Latest BlueStacks 5         |
| WSL                         | **2.1.5+ for Docker Desktop**                                | Latest WSL                  |
| WSL distro                  | WSL 2                                                        | WSL 2                       |
| Docker Desktop              | Current supported version                                    | Latest stable               |
| Docker backend              | WSL 2                                                        | **WSL 2**                   |
| Virtual Machine Platform    | Required for WSL2                                            | Enabled                     |
| Windows Hypervisor Platform | Required for supported emulator/virtualization configuration | Enabled                     |
| Hardware virtualization     | AMD-V / Intel VT-x                                           | Enabled                     |
| Hypervisor boot             | Enabled                                                      | `hypervisorlaunchtype auto` |

Docker's current Windows requirements specify WSL 2.1.5 or newer and supported Windows releases; WSL2 itself uses Virtual Machine Platform as its virtualization component.

---

# 16. Verification Result

**Verified in practice:**

```text
Windows 11
      +
BlueStacks 5
      +
WSL2
      +
Docker
      +
Android application/game
      +
Development / deployment workflow
```

can run simultaneously.

The critical compatibility requirement is using a sufficiently recent BlueStacks release, with **BlueStacks 5.20+** being the important documented Hyper-V compatibility milestone.

---

# 17. Future Maintenance

When upgrading any of the following:

* Windows
* BlueStacks
* WSL
* Docker Desktop

re-run the coexistence test:

```text
[ ] Windows boots normally
[ ] BlueStacks starts
[ ] Android instance starts
[ ] WSL2 starts
[ ] Docker Desktop starts
[ ] docker ps works
[ ] Docker build works
[ ] make deploy works
[ ] BlueStacks remains running during Docker build/deploy
```

The goal is to preserve this invariant:

```text
Gaming environment
        +
Development environment
        +
Deployment environment

        ↓

NO REBOOT REQUIRED
NO HYPER-V TOGGLE REQUIRED
NO WSL DISABLE REQUIRED
```

---

## References

* BlueStacks Hyper-V compatibility: BlueStacks 5.20+ supports Hyper-V-enabled configurations.
* Microsoft WSL documentation: WSL2 uses the Virtual Machine Platform / Hyper-V architecture.
* Docker Desktop Windows requirements: WSL 2.1.5+ and supported Windows versions.
* Docker Desktop WSL2 backend documentation.
* Microsoft Hyper-V hardware requirements.
