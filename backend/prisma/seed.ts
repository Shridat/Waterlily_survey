import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

async function main(){
    if(await prisma.questions.count()){
        console.log('Questions already exist, skipping seed.');
        return;
    }
    await prisma.questions.createMany({
      data:[
        // --- Demographic ---
        { title: 'Age', description: 'Enter your age in years' },
        { title: 'Biological Sex', description: 'Select the sex you were assigned at birth or identify with' },
        { title: 'Marital Status', description: 'Current marital or partnership status' },

        // --- Health ---
        { title: 'Height (cm)', description: 'Enter your height in centimeters' },
        { title: 'Weight (kg)', description: 'Enter your weight in kilograms' },
        { title: 'Smoking Status', description: 'Do you currently or have you ever smoked' },
        { title: 'Alcohol Consumption', description: 'How often you drink alcohol' },
        { title: 'Exercise Frequency', description: 'How often you exercise per week' },
        { title: 'Chronic Conditions', description: 'List any long-term health conditions you have been diagnosed with' },

        // --- Financial ---
        { title: 'Annual Income (USD)', description: 'Your approximate yearly income before taxes' },
        { title: 'Health Insurance Coverage', description: 'Do you currently have health insurance' },
        { title: 'Long-Term Care Insurance Coverage', description: 'Do you currently hold long-term care insurance' },
        { title: 'Estimated Monthly Living Expenses (USD)', description: 'Your average monthly expenses for living needs' },
    ],
    });
    console.log("Seeded questions successfully!")
}
main()
.catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
