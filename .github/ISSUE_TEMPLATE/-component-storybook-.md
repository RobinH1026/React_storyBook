---
name: "[Component&Storybook]"
about: Component and Storybook developer
title: "[Component&Storybook]"
labels: Component, Storybook
assignees: ''

---

# Project 
## Please must be sure to understand clearly before developing
- [[L] ISMS-01-015 Front-end Development - Architecture & Specification](https://paper.dropbox.com/doc/L-ISMS-01-015-Front-end-Development-Architecture-Specification-TZgIPtemZwVtvPmaOX147#:h2=[L]-ISMS-01-015-Front-end-Deve)
- [Coding Specification](https://paper.dropbox.com/doc/L-ISMS-01-015-Front-end-Development-Architecture-Specification-TZgIPtemZwVtvPmaOX147#:uid=902083922869456272782841&h2=Coding-Specification)
- [Component library introduction](https://paper.dropbox.com/doc/L-ISMS-01-015-Front-end-Development-Architecture-Specification-TZgIPtemZwVtvPmaOX147#:uid=389847008630544294996817&h2=Component-library-introduction)

---
## Deadline
Deadline need to push the code.
- YYYY/MM/DD  (GMT+8)

---
## Description
A clear and concise description of what the problem is.
- [ ] New component
   - Component
       - Name : {{componentName}}
       - Structure : 
            - packages/{{Package}}/{{componentName}}";
       - Package
            - [ ] material
            - [ ] material-form
            - [ ] material-formik
            - [ ] material-icons
            - [ ] material-intl
            - [ ] material-lab
            - [ ] material-layout
            - [ ] material-module
            - [ ] material-router
![image](https://user-images.githubusercontent.com/10756817/194060124-90676e8d-1b2b-4219-8660-71455555d107.png)

   - Storybook
        - Structure 
            - {{Package}}/{{componentName}}    
       - Export Const : {{ Default or others type of the component }}
       - Package 
            - [ ] Intel
            - [ ] Hook
            - [ ] Icon
            - [ ] infocenter
            - [ ] LAB
            - [ ] Layout
            - [ ] Components
            - [ ] Styles   
![image](https://user-images.githubusercontent.com/10756817/194060224-45898362-7cfd-48b8-a173-4da64e0740bc.png)

- [ ] Exist component , need you update 
   - Structure : 
       - Storybook/Components/{{componentsName}}/DefaultV3";
   - [ ] Component Update
       - package path screenshot 
   - [ ] Storybook Update
       - [Storybook]()
       - package path screenshot 

- Design 
    - [Figma](https://www.figma.com/file/OlUxH6H4u3DLEmeytXgNkV/Infocenter-UI-Kit?node-id=599%3A1731)
        - {{ UI screenshot }}

---
## Salary 
USD XXX

--- 
## Branch
- Create branch from : branch main 
    - If the branch exist just use it , if not can create by your self
    - “issue/" issue's NO.
        - for example 
            - issue/1009
---
## Goal
- [ ] Follow the naming, package's structure , 
- [ ] Follow the UI Design
- [ ] Follow the UX Prototype Design
- [ ] Implements each status of the component
- [ ] RWD
    - [ ] [PC]()
     - [ ] [Mobile]()
- [ ] Embed Figma in Storybook

---
# Resources
## Figma
- [Figma](https://www.figma.com/file/OlUxH6H4u3DLEmeytXgNkV/Infocenter-UI-Kit?node-id=397%3A3119)

## Storybook
- [Storybook-Chromatic](https://6315727d26061e4ff69beeea-lfqjbcdfze.chromatic.com)

---
# Acceptance 
## Function Review
- [ ] Follow the naming, package's structure , 
- [ ] Follow the UI Design
- [ ] Follow the UX Prototype Design
- [ ] Implements each status of the component
- [ ] RWD
    - [ ] [PC]()
     - [ ] [Mobile]()
- [ ] Embed Figma in Storybook

---
## Salary penalty
- Submission over deadline
    - Salary deduction 25%/day
        - Deadline for the first delivery
        - Usually doesn't happen, time can be discussed and the key is to communicate
            - Before : You can propose the completion time, if there is any problem, we will discuss with you
            - In Progress : You can ask the problems encountered, and discuss the schedule change
        - Prevent
            - Disappear without communication, and then suddenly appear after Deadline to deliver the project
            - Due to various reasons, the development cannot be completed, but the unfinished project is delivered for acceptance
- Quality problem
    - Salary deduction 1% per questions 
    - Test by QC team 
    - Include 
       - Function
              - Fulfilling requirements.
              - Delivering complete code and functionality.
       - Fool-proof design (Acceptance Check List)
              - API
              - UI 
     - Prevent
          - Developers deliver without testing completeness, causing a lot of burden on QC manpower
          - The developer does not fully guarantee the code developed by himself, so the quality is reversely required in this way
          - For example: 
                  - Currently our deployment process is: issue -> dev -> main -> prerelease -> release
                  - It may have been 1~2 weeks since this process has been completed. During these stages, different users may detect different levels of problems, but we have encountered some developers who limit their code to only issue or 24HR.
                  - But if you develop in a way that will preserve your code, fix bugs instead of payroll deductions
- Incapable of completing
       - Accepting the case but incapable of completing it.
       - Only paid for completed jobs, and 
                  - Maximum salary is 75% of the total project budget.

---
# Additional
## Storybook official Resources
- Implements figma design to this components and storybook  please follow the official rule and tutorial 
    - [Storybook official](https://storybook.js.org/docs/react/get-started/introduction)
    - [Storybook Tutorial](https://storybook.js.org/tutorials/intro-to-storybook/react/en/get-started/)    

- How to embed Figma in Storybook
    - [Document Example](https://help.figma.com/hc/en-us/articles/360045003494-Storybook-and-Figma)
    - ![image](https://user-images.githubusercontent.com/10756817/192202799-69f212ff-4b46-43d4-9a42-d5058b96c616.png)
    - Example 
        - `parameters: {
    design: {
      type: "figma",
      url: "{{figma url}}",
    },
  },`
        - ![image](https://user-images.githubusercontent.com/10756817/194999964-5c62b61d-81d7-4495-869c-b2b8a7f97457.png)
