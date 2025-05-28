import './instruction.css'
function Instruction() {
    return (
        <>
            <section className="how-it-works">

                <div className="steps-grid">
                    <div className="step">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135765.png" alt="Реєстрація" />
                        <h3>1. Sign up</h3>
                        <p>Sign up or login to participate</p>
                    </div>
                    <div className="step">
                        <img src="https://www.svgrepo.com/show/501852/computer.svg" alt="Участь" />
                        <h3>2. Participate</h3>
                        <p>Choose hackathon and work</p>
                    </div>
                    <div className="step">
                        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="Бали" />
                        <h3>3. Collect points</h3>
                        <p>Get points for winning</p>
                    </div>
                    <div className="step">
                        <img src="https://www.svgrepo.com/show/450423/cup.svg" alt="Перемога" />
                        <h3>4. Win</h3>
                        <p>Win and have a lot of fun</p>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Instruction;