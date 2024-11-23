import { setLocale, string } from 'yup'
export default function () {
  const initYup = () => {
    setLocale({
      mixed: {
        default: 'Default',
        required: 'Required',
      },
      string: {
        email: 'อีเมล์ไม่ถูกต้อง',
        min: 'ต้องมีความยาวอย่างน้อย ${min} ตัวอักษร',
        max: 'ต้องมีความยาวน้อยกว่า ${max} ตัวอักษร',
      },
      number: {
        min: 'ขั้นต่ำ ${min}',
        max: 'สูงสุด ${max}',
      },
    })
  }

  const telNoSchema = string()
    .required()
    .matches(/^0[689]{1}[0-9]{8}$/, 'เบอร์โทรศัพท์ไม่ถูกต้อง')

  const bankAccountNoSchema = (bankCode: string) => {
    // const config = useConfig()
    // const defaultValidate = string().required()
    // if (!bankCode || !config.value?.bankData) return defaultValidate
    // const accountLength = config.value.bankData[bankCode]?.accountLength
    // if (!accountLength) return defaultValidate
    // const splitLength = accountLength.split(',')
    // const regex = new RegExp(
    //   `^(${splitLength.map((length) => `[0-9]{${length}}`).join('|')})$`,
    // )
    // return defaultValidate.matches(
    //   regex,
    //   `หมายเลขบัญชีไม่ถูกต้อง (${accountLength} หลัก)`,
    // )
  }

  return { initYup, telNoSchema }
}
